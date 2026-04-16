import express from 'express';
import { handleWordGame } from '../services/wordleService.js';

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const { word, row, modus, id } = req.body;

        if (!word || !row || !modus || !id) {
            return res.status(400).json({ error: 'Invalid data' });
        }

        const result = handleWordGame({ word, row, modus, id });

        res.json(result);
    } catch (err) {
        if (err.message === 'SESSION_NOT_FOUND') {
            return res.status(404).json({ error: 'Session not found' });
        }

        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;