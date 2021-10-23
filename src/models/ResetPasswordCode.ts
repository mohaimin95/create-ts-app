/* eslint-disable func-names */
import { BcryptService } from '@services';
import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

schema.pre('save', function (next) {
  this.code = BcryptService.hashPwd(this.code);
  next();
});

schema.pre('updateOne', function (next) {
  this._update.$set.code = BcryptService.hashPwd(this._update.$set.code);
  next();
});

const ResetPasswordCode = mongoose.model('ResetPasswordCode', schema);

export default ResetPasswordCode;
