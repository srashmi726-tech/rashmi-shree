import { Hono } from 'hono';

export const authRoute = new Hono();

authRoute.get('/login', (c) => c.json({ ok: true, mode: 'firebase-or-otp' }));
