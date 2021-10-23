/* eslint-disable func-names */
import { BcryptService } from '@services';
import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

schema.pre('save', function (next) {
  this.verificationCode = BcryptService.hashPwd(this.verificationCode);
  next();
});

schema.pre('updateOne', function (next) {
  this._update.$set.verificationCode = BcryptService.hashPwd(this._update.$set.verificationCode);
  next();
});

const EmailVerificationCode = mongoose.model('EmailVerificationCode', schema);

export default EmailVerificationCode;
