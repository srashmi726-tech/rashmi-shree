import { Hono } from 'hono';

export const productsRoute = new Hono();

productsRoute.get('/', (c) => c.json({ items: [], note: 'Product catalog placeholder' }));
productsRoute.get('/:id', (c) => c.json({ id: c.req.param('id'), note: 'Single product placeholder' }));
