import express from 'express';
import testRoute from './routes/test.js';
import saveRoute from './routes/save.js';
import resolveRoute from './routes/resolve.js';

const app = express();

app.use(express.json());
app.use('/api', testRoute);
app.use('/api', saveRoute);
app.use('/api', resolveRoute);

// ------- L O C A L   S E R V E R --------
if (process.env.NODE_ENV !== 'production') {
	const PORT = 3000;

	app.listen(PORT, () => {
		console.log(`🚀 Local server running on http://localhost:${PORT}`);
	});
}

export default app;
