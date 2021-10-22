import { authMiddleware } from '@middlewares';
import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.post('/forgot-password', UserController.forgotPassword);
router.put('/reset-password', UserController.resetPassword);

router.post('/send-verification-email', authMiddleware(true), UserController.sendVerificationEmail);
router.put('/verify-email', authMiddleware(true), UserController.verifyEmail);
router.put('/change-password', authMiddleware(true), UserController.changePassword);

export default router;
