import * as jwt from 'jsonwebtoken';

const { JWT_KEY, JWT_VALIDITY = '1h' } = process.env;

export class JWTService {
  static getToken(obj) {
    return jwt.sign(obj, JWT_KEY, {
      expiresIn: JWT_VALIDITY,
    });
  }

  static decodeToken(token) {
    try {
      return jwt.verify(token, JWT_KEY);
    } catch (ex) {
      throw new Error('Invalid token !!!');
    }
  }
}
