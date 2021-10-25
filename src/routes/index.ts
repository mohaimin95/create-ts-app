import { Router } from 'express';
import userRouter from './userRouter';
import categoryRouter from './categoryRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/category', categoryRouter);

router.use('*', (req, res) => {
  res.status(404).end('404:Not Found');
});

export default router;
