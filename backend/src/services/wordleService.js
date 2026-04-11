import {
	getRandomWord,
	createSession,
	getSession,
	deleteSession
} from '../repositories/wordleRepository.js';

export async function handleWordGame({ word, row, modus, id }) {
	let wordToGuess;

	if (row === 1) {
		wordToGuess = await getRandomWord(modus);
		await createSession(id, wordToGuess);
	} else {
		wordToGuess = await getSession(id);

		if (!wordToGuess) {
			throw new Error('SESSION_NOT_FOUND');
		}
	}

	const result = compareStrings(wordToGuess, word);

	if (word === wordToGuess) {
		await deleteSession(id);

		return {
			status: 'OK',
			guessedCorrectly: 'Y',
			wordToGuess
		};
	}

	if (row >= modus) {
		await deleteSession(id);

		return {
			status: 'OK',
			guessedCorrectly: 'O',
			correctWord: wordToGuess
		};
	}

	return {
		status: 'OK',
		guessedCorrectly: 'N',
		information: result
	};
}

function compareStrings(str1, str2) {
	const result = [];
	const freq = {};

	for (let c of str1) freq[c] = (freq[c] || 0) + 1;

	for (let i = 0; i < str2.length; i++) {
		if (str2[i] === str1[i]) {
			result[i] = `${str2[i]} = #a5d6a7`;
			freq[str2[i]]--;
		}
	}

	for (let i = 0; i < str2.length; i++) {
		if (!result[i]) {
			if (freq[str2[i]] > 0) {
				result[i] = `${str2[i]} = #ffcc80`;
				freq[str2[i]]--;
			} else {
				result[i] = `${str2[i]} = #ef9a9a`;
			}
		}
	}

	return result;
}
