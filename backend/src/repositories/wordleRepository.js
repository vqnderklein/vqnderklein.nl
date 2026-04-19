import { db } from '../db/db.js';

const getRandomWordStmt = db.prepare(`
    SELECT word FROM GuessTheWord 
    WHERE LENGTH(word) = ? 
    ORDER BY RANDOM() LIMIT 1
`);

export function getRandomWord(modus) {
    const row = getRandomWordStmt.get(modus);
    return row ? row.word.toLowerCase() : null;
}

const createSessionStmt = db.prepare(`
    INSERT INTO GameSessions (unique_id, generated_word)
    VALUES (?, ?)
`);

export function createSession(id, word) {
    createSessionStmt.run(id, word);
}

const getSessionStmt = db.prepare(`
    SELECT generated_word FROM GameSessions WHERE unique_id = ?
`);

export function getSession(id) {
    const row = getSessionStmt.get(id);
    return row ? row.generated_word : null;
}

const deleteSessionStmt = db.prepare(`
    DELETE FROM GameSessions WHERE unique_id = ?
`);

export function deleteSession(id) {
    deleteSessionStmt.run(id);
}
