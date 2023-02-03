import productRouter from '@routes/products.router';
import categoriesRouter from '@routes/categories.router';
import usersRouter from '@routes/users.router';
import customerRouter from '@routes/customers.router';
import ordersRoute from '@routes/orders.router';
import { Router, Express } from 'express';

const router = (app: Express) => {
  const router = Router();
  app.get('/', (_req, res) => res.send('Welcome to the ecommerce api. '));
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/customers', customerRouter);
  router.use('/orders', ordersRoute);
};

export default router;
