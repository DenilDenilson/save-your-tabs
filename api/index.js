import express from 'express';
import crypto from 'crypto';
import { createClient } from '@libsql/client';
import { error, timeStamp } from 'console';

const app = express();
app.use(express.json());

// -------- TURSO --------------
const db = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});
// -----------------------------

// T E S T
app.get('/test', async (req, res) => {
	res.status(200).json({
		status: 'ok',
		message: 'Server is running',
		timeStamp: Date.now(),
	});
});

// S A V E
app.post('/api/save', async (req, res) => {
	try {
		const { urls } = req.body;
		if (!Array.isArray(urls) || urls.length === 0) {
			return res.status(400).json({ error: 'Invalid URLs' });
		}

		const id = crypto.randomBytes(6).toString('base64url');

		await db.execute({
			sql: 'INSERT INTO sessions (id, urls) VALUES (?, ?)',
			args: [id, JSON.stringify(urls)],
		});

		res.json({ id });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err });
	}
});

// R E S O L V E
app.get('/api/resolve/:id', async (req, res) => {
	try {
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
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err });
	}
});

// ------- L O C A L   S E R V E R --------
if (process.env.NODE_ENV !== 'production') {
	const PORT = 3000;

	app.listen(PORT, () => {
		console.log(`🚀 Local server running on http://localhost:${PORT}`);
	});
}

export default app;
