import { IUser } from '@interfaces';
import { UserService } from '@services';

async function emailVerification(req, res, next) {
  if (req.user && req.user._id) {
    let isEmailVerified;

    if (req.user.isUpdated) {
      isEmailVerified = req.user.isEmailVerified;
    } else {
      const user: IUser = await UserService.getUserById(req.user._id);

      if (!user) {
        res.status(401).send('Unauthorized');
      }
      req.user = {
        ...(user || {}),
        isUpdated: true,
      };
      isEmailVerified = user && user.isEmailVerified;
    }

    if (!isEmailVerified) {
      res.status(403).send('Email verification not done !!!');
    }
    next();
  } else {
    res.status(403).send('Unauthorized');
  }
}

export default emailVerification;
