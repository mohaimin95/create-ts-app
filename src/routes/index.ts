import { Router } from 'express';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);

router.use('*', (req, res) => {
  res.status(404).end('404:Not Found');
});

export default router;
