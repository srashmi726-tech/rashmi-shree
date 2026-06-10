import { Hono } from 'hono';

export const ordersRoute = new Hono();

ordersRoute.get('/', (c) => c.json({ items: [], note: 'Orders placeholder' }));
