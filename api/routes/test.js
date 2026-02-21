import { Router } from 'express';

const router = Router();

// T E S T
router.get('/test', async (req, res) => {
	res.status(200).json({
		status: 'ok',
		message: 'Server is running',
		timestamp: Date.now(),
	});
});

export default router;
