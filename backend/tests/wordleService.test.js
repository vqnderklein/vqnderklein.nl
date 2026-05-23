import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../src/repositories/wordleRepository.js', () => ({
	getRandomWord: vi.fn(),
	createSession: vi.fn(),
	getSession: vi.fn(),
	deleteSession: vi.fn()
}));

import {
	getRandomWord,
	getSession,
	deleteSession
} from '../src/repositories/wordleRepository.js';

import { handleWordGame } from '../src/services/wordleService.js';

describe('handleWordGame', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('creates a new session on first row', () => {
		getRandomWord.mockReturnValue('apple');

		const result = handleWordGame({
			word: 'apron',
			row: 1,
			modus: 5,
			id: '123'
		});

		expect(result.status).toBe('OK');
		expect(result.guessedCorrectly).toBe('N');
	});

	it('returns correct result when guessed', () => {
		getSession.mockReturnValue('apple');

		const result = handleWordGame({
			word: 'apple',
			row: 2,
			modus: 5,
			id: '123'
		});

		expect(result.guessedCorrectly).toBe('Y');
		expect(deleteSession).toHaveBeenCalledWith('123');
	});

	it('throws when session does not exist', () => {
		getSession.mockReturnValue(null);

		expect(() =>
			handleWordGame({
				word: 'apple',
				row: 2,
				modus: 5,
				id: '123'
			})
		).toThrow('SESSION_NOT_FOUND');
	});
});