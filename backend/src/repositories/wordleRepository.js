import { db } from '../db/db.js';

export async function getRandomWord(modus) {
	const [rows] = await db.query(
		`SELECT word FROM GuessTheWord 
         WHERE CHAR_LENGTH(word) = ? 
         ORDER BY RAND() LIMIT 1`,
		[modus]
	);

	return rows[0]?.word.toLowerCase();
}

export async function createSession(id, word) {
	await db.query(
		`INSERT INTO GameSessions (unique_id, generated_word)
         VALUES (?, ?)`,
		[id, word]
	);
}

export async function getSession(id) {
	const [rows] = await db.query(
		`SELECT generated_word FROM GameSessions WHERE unique_id = ?`,
		[id]
	);

	return rows[0]?.generated_word;
}

export async function deleteSession(id) {
	await db.query(
		`DELETE FROM GameSessions WHERE unique_id = ?`,
		[id]
	);
}
