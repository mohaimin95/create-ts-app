import { CategoryController } from '@controllers';
import { authMiddleware } from '@middlewares';
import { Router } from 'express';

const router = Router();

router.use(authMiddleware());
router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getOne);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

export default router;
