export interface IEmailVerificationCode {
  _id?: string;
  userId?: string;
  verificationCode?: string;
  createdAt?: Date;
}
