import express from 'express';
import request from 'supertest';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/services/wordleService.js', () => ({
	handleWordGame: vi.fn()
}));

import { handleWordGame } from '../src/services/wordleService.js';
import router from '../src/routes/wordleRouter.js';

const app = express();
app.use(express.json());
app.use('/wordle', router);

describe('POST /wordle', () => {
	it('returns 400 for invalid payload', async () => {
		const response = await request(app)
			.post('/wordle')
			.send({});

		expect(response.status).toBe(400);
	});

	it('returns game result', async () => {
		handleWordGame.mockReturnValue({
			status: 'OK',
			guessedCorrectly: 'N'
		});

		const response = await request(app)
			.post('/wordle')
			.send({
				word: 'apple',
				row: 1,
				modus: 5,
				id: '123'
			});

		expect(response.status).toBe(200);
		expect(response.body.status).toBe('OK');
	});

	it('returns 404 when session missing', async () => {
		handleWordGame.mockImplementation(() => {
			throw new Error('SESSION_NOT_FOUND');
		});

		const response = await request(app)
			.post('/wordle')
			.send({
				word: 'apple',
				row: 2,
				modus: 5,
				id: '123'
			});

		expect(response.status).toBe(404);
	});
});