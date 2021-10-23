/* eslint-disable no-underscore-dangle */
import { BcryptService, EmailService, JWTService } from '@services';
import { EmailVerificationCode, ResetPasswordCode, User } from '@models';
import { IEmailVerificationCode, IPasswordResetCode, IUser } from '@interfaces';
import { EmailTemplates } from '../static/emailTemplates';

export class UserService {
  static async login({ email, password }) {
    if (email && password) {
      try {
        const user: IUser = await User.findOne(
          { email: email.toLowerCase().trim() },
          {
            name: 1,
            email: 1,
            password: 1,
            _id: 1,
          }
        );

        if (!user) {
          throw new Error('Unauthorized user.');
        } else {
          if (BcryptService.comparePwd(password, user.password)) {
            const token = JWTService.getToken({
              _id: user._id,
              loggedInAt: new Date().getTime(),
            });

            return {
              name: user.name,
              email: user.email,
              token,
            };
          }

          throw new Error('Unauthorized user.');
        }
      } catch (ex) {
        throw new Error('Unauthorized user.');
      }
    } else {
      throw new Error('Missing Credentials.');
    }
  }

  static async signup({ name, email, password }) {
    if (name && email && password) {
      const newUser = new User({
        name,
        email,
        password,
      });
      const user = await newUser.save();
      const token = JWTService.getToken({
        loggedInAt: new Date(),
        _id: user._id,
      });

      return {
        token,
        name,
        email,
      };
    }

    throw new Error('Missing data!!!');
  }

  static async getUserById(id, options?: any): Promise<IUser | undefined> {
    if (options && options.selectAll) {
      try {
        const res: any = await User.findOne({ _id: id }).select('+password').exec();

        return res && res._doc ? res._doc : null;
      } catch (ex) {
        throw new Error(ex.message || 'Unknown Error!');
      }
    }

    return User.findById(id, options).lean() as unknown as Promise<IUser>;
  }

  static async sendVerificationEmail(user: IUser) {
    const { name, email: userEmail, _id: userId, isEmailVerified } = user;

    if (isEmailVerified === true) {
      throw new Error('Email already verified!!!');
    }
    const verificationCode = Math.ceil(Math.random() * 100000);
    const { subject, html } = EmailTemplates.emailVerification({
      name,
      verificationCode,
    });

    try {
      await EmailService.sendMail({
        to: userEmail,
        subject,
        html,
      });
      await EmailVerificationCode.deleteMany({ userId });
      // eslint-disable-next-line object-property-newline
      const newEmailVerification = new EmailVerificationCode({ userId, verificationCode: verificationCode.toString() });

      return newEmailVerification.save();
    } catch (ex) {
      // eslint-disable-next-line no-console
      console.log(ex);

      throw new Error('Email failed');
    }
  }

  static async verifyEmail(user: IUser, verificationCode: number) {
    if (user.isEmailVerified === true) {
      throw new Error('Email already verified');
    }
    const emailInfo: IEmailVerificationCode = await EmailVerificationCode.findOne({ userId: user._id }).lean();

    if (!emailInfo) {
      throw new Error('Code is invalid, please request a new verification email !!!');
    } else if (!BcryptService.comparePwd(verificationCode.toString(), emailInfo.verificationCode)) {
      throw new Error('Code is invalid, please request a new verification email !!!');
    } else {
      await EmailVerificationCode.deleteMany({ userId: user._id });
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            isEmailVerified: true,
          },
        }
      );

      return 'Email successfully verified';
    }
  }

  static async changePassword(data: any, user: IUser) {
    const { oldPassword, newPassword } = data;

    if (BcryptService.comparePwd(oldPassword, user.password)) {
      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            password: newPassword,
          },
        }
      );
    } else {
      throw new Error('Old password is not matching !!!');
    }
  }

  static async sendForgotPasswordEmail(email: string) {
    const user: IUser = await User.findOne({ email: email.toLowerCase().trim() }).lean();

    if (!user) {
      return {
        message: 'Verification code will be sent if we found your email in our records.',
      };
    }
    const verificationCode = Math.ceil(Math.random() * 100000).toString();

    await ResetPasswordCode.deleteMany({ userId: user._id });
    const newPasswordResetCode = new ResetPasswordCode({
      userId: user._id,
      code: verificationCode,
    });

    await newPasswordResetCode.save();
    const { subject, html } = EmailTemplates.resetPassword({
      name: user.name,
      verificationCode,
    });

    await EmailService.sendMail({
      to: user.email,
      subject,
      html,
    });

    return {
      message: 'Verification code will be sent if we found your email in our records.',
    };
  }

  static async verifyAndResetPassword(code: string | number, email: string, password: string) {
    if (!code) {
      throw new Error('Code is required to reset the password!');
    }
    const { _id: userId } = ((await User.findOne({ email: email.trim().toLowerCase() }, { _id: 1 })) as IUser) || {};

    if (userId) {
      const resetPasswordCodes: IPasswordResetCode = await ResetPasswordCode.findOne({ userId });

      if (!code) {
        throw new Error('Code is invalid!');
      }

      if (BcryptService.comparePwd(code, resetPasswordCodes.code)) {
        await User.updateOne(
          { _id: userId },
          {
            $set: {
              password,
            },
          }
        );

        return 'Success';
      }

      throw new Error('Code is invalid!');
    }

    throw new Error('Code is invalid!');
  }
}
