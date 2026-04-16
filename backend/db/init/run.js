import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, 'database.sqlite');
const SCHEMA_FILE = path.join(__dirname, '01-scheme.sql');
const SEED_FILE = path.join(__dirname, '02-seed.sql');

if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
    console.log('Old database removed');
}

const db = new Database(DB_FILE);
console.log('New SQLite database created');

const schemaSQL = fs.readFileSync(SCHEMA_FILE, 'utf-8');
const seedSQL = fs.readFileSync(SEED_FILE, 'utf-8');

db.exec(schemaSQL);
console.log('Schema applied');

db.exec(seedSQL);
console.log('Seed data inserted');

db.exec(`
	PRAGMA journal_mode = WAL;
	PRAGMA synchronous = NORMAL;
`);

export default db;