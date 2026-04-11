import express from 'express';
import { getRandomImages } from '../services/imageService.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const images = await getRandomImages();
		res.json(images);
	} catch (err) {
		console.error(err);

		if (err.message.startsWith('PEXELS_ERROR')) {
			return res.status(502).json({ error: 'Pexels API failed' });
		}

		res.status(500).json({ error: 'Failed to fetch images' });
	}
});

export default router;
