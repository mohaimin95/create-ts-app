import { Request, Response } from 'express';
import { UserService } from '@services';

export class UserController {
  static async login(req: Request, res: Response) {
    try {
      const data = await UserService.login(req.body);

      res.send(data);
    } catch (ex) {
      res.status(401).send(ex);
    }
  }

  static async signup(req: Request, res: Response) {
    try {
      const data = await UserService.signup(req.body);

      res.send(data);
    } catch (ex) {
      res.status(401).send(ex);
    }
  }

  static async changePassword(req: Request | any, res: Response) {
    try {
      await UserService.changePassword(req.body, req.user);
      res.send({ message: 'Success' });
    } catch (ex) {
      res.status(500).send({ message: ex.message || 'Failed' });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const response = await UserService.sendForgotPasswordEmail(req.body.email);

      res.send(response);
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  }

  static async resetPassword(req: Request, res: Response) {
    const { email, code, password } = req.body;

    try {
      await UserService.verifyAndResetPassword(code, email, password);
      res.send({ message: 'Success' });
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  }

  static async sendVerificationEmail(req: Request | any, res: Response) {
    try {
      await UserService.sendVerificationEmail(req.user);
      res.send({ message: 'Verification email successfully sent' });
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  }

  static async verifyEmail(req: Request | any, res: Response) {
    try {
      await UserService.verifyEmail(req.user, req.body.verificationCode);
      res.send({ message: 'Email successfully verified !!!' });
    } catch (ex) {
      res.status(500).send(ex.message);
    }
  }
}
