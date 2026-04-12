import express from 'express';
import cors from 'cors';
import wordleRouter from './routes/wordleRouter.js';
import imageRouter from './routes/imageRouter.js';
import mailerRouter from './routes/mailerRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.BEARER_API_TOKEN;

app.use((req, res, next) => {
	// const auth = req.headers.authorization;

	// if (!auth) return res.status(401).json({ error: 'Missing auth' });

	// const [type, token] = auth.split(' ');

	// if (type !== 'Bearer' || token !== API_KEY) {
	// 	return res.status(403).json({ error: 'Invalid token' });
	// }

	next();
});

app.use('/api/wordle', wordleRouter);

app.use('/api/images', imageRouter);

app.use('/api/send-message', mailerRouter);

app.listen(4000, () => console.log('API running on 4000'));
