import { Router } from 'express';
import { db } from '../db.js';
import crypto from 'crypto';

const router = Router();

// S A V E
router.post('/save', async (req, res) => {
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

		console.log(`CREATED SESSION ${id}`);
		res.json({ id });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err });
	}
});

export default router;
