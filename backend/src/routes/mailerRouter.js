import express from 'express';
import { sendContactFormEmail } from '../services/mailerService.js';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await sendContactFormEmail(req.body);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Failed to send email' });
    }
});

export default router;
