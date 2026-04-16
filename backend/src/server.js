import express from 'express';
import cors from 'cors';
import wordleRouter from './routes/wordleRouter.js';
import imageRouter from './routes/imageRouter.js';
import mailerRouter from './routes/mailerRouter.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ENDPOINTS
app.use('/api/wordle', wordleRouter);
app.use('/api/images', imageRouter);
app.use('/api/send-message', mailerRouter);

app.listen(4000, () => console.log('API running on 4000'));
