import { IUser } from '@interfaces';
import { JWTService, UserService } from '@services';

function authMiddleware(resolveUser = false) {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401).send('Unauthorized request !!!');

      return;
    }

    try {
      const [, token] = (authorization || '').split('Bearer ');
      let data = JWTService.decodeToken(token);

      if (data && data._id) {
        if (resolveUser === true) {
          try {
            const user: IUser = await UserService.getUserById(data._id, { selectAll: true });

            data = {
              ...data,
              ...(user || {}),
              isUpdated: true,
            };
          } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
          }
        }
        req.user = data;
        next();
      } else {
        res.status(401).send('Unauthorized request !!!');
      }
    } catch (ex) {
      res.status(401).send('Unauthorized request !!!');
    }
  };
}

export default authMiddleware;
