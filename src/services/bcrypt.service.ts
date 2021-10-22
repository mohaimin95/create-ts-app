import * as bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

export class BcryptService {
  static hashPwd(password): string {
    return bcrypt.hashSync(password, salt);
  }

  static comparePwd(password, hash): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
