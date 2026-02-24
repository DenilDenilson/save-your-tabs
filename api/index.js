import express from 'express';
import testRoute from './routes/test.js';
import cors from 'cors';
import saveRoute from './routes/save.js';
import resolveRoute from './routes/resolve.js';

const isProd = process.env.NODE_ENV === 'production';
console.log('Entorno en producción? ', isProd);

const app = express();

app.use(express.json());

app.use(
	cors({
		origin: isProd ? process.env.ALLOWED_ORIGINS.split(',') : true,
	}),
);

app.use('/api', testRoute);
app.use('/api', saveRoute);
app.use('/api', resolveRoute);

// ------- L O C A L   S E R V E R --------
if (!isProd) {
	const PORT = 3000;

	app.listen(PORT, () => {
		console.log(`🚀 Local server running on http://localhost:${PORT}`);
	});
}

export default app;
