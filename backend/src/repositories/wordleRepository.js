import { db } from '../db/db.js';

export function getRandomWord(modus) {
    const rows = db
        .prepare(
            `SELECT word FROM GuessTheWord 
             WHERE LENGTH(word) = ? 
             ORDER BY RANDOM() LIMIT 1`
        )
        .all(modus);

    return rows[0] ? rows[0].word.toLowerCase() : null;
}

export function createSession(id, word) {
    db.prepare(
        `INSERT INTO GameSessions (unique_id, generated_word)
         VALUES (?, ?)`
    ).run(id, word);
}

export function getSession(id) {
    const row = db
        .prepare(
            `SELECT generated_word FROM GameSessions WHERE unique_id = ?`
        )
        .get(id);

    return row ? row.generated_word : null;
}

export function deleteSession(id) {
    db.prepare(
        `DELETE FROM GameSessions WHERE unique_id = ?`
    ).run(id);
}