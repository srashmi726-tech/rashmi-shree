import { Hono } from 'hono';
import { authRoute } from './routes/auth';
import { productsRoute } from './routes/products';
import { ordersRoute } from './routes/orders';

const app = new Hono();

app.get('/', (c) =>
  c.json({
    success: true,
    service: 'Rashmi Shree API',
    status: 'skeleton-ready'
  })
);

app.get('/health', (c) => c.json({ ok: true }));

app.route('/auth', authRoute);
app.route('/products', productsRoute);
app.route('/orders', ordersRoute);

export default app;
