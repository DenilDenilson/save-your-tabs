import express from 'express';
import crypto from 'crypto';
import { createClient } from '@libsql/client';

const app = express();
app.use(express.json());

const db = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

// S A V E
app.post('/api/save', async (req, res) => {
	const { urls } = req.body;

	if (!Array.isArray(urls) || urls.length === 0) {
		return res.status(400).json({ error: 'Invalid URLs' });
	}

	const id = crypto.randomBytes(6).toString('base64url');

	await db.execute({
		sql: 'INSERT INTO sessions (id, urls, created_at) VALUES (?, ?, ?)',
		args: [id, JSON.stringify(urls), Date.now()],
	});

	res.json({ id });
});

// R E S O L V E
app.get('/api/resolve/:id', async (req, res) => {
	const { id } = req.params;

	const result = await db.execute({
		sql: 'SELECT urls FROM sessions WHERE id = ?',
		args: [id],
	});

	if (result.rows.length === 0) {
		return res.status(404).json({ error: 'Not found url' });
	}

	const urls = JSON.parse(result.rows[0].urls);
	res.json({ urls });
});

export default app;
