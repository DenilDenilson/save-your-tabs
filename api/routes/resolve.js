import { Router } from 'express';
import { db } from '../db.js';

const router = Router();

// R E S O L V E
router.get('/resolve/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const result = await db.execute({
			sql: 'SELECT urls FROM "syt-sessions" WHERE id = ?',
			args: [id],
		});

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Not found url' });
		}

		const urls = JSON.parse(result.rows[0].urls);
		console.log('Urls recuperadas ', urls);
		res.json({ urls });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err });
	}
});

export default router;
