import { createClient } from '@libsql/client';

// -------- TURSO --------------
export const db = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});
// -----------------------------
