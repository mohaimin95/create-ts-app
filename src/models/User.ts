/* eslint-disable func-names */
import { BcryptService } from '@services';
import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
      validate: {
        validator: (value) =>
          // eslint-disable-next-line
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          ),
        message: 'Email not valid!',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', function (next) {
  this.password = BcryptService.hashPwd(this.password);
  next();
});
userSchema.pre('updateOne', function (next) {
  this._update.$set.password = BcryptService.hashPwd(this._update.$set.password);
  next();
});
const User = mongoose.model('User', userSchema);

export default User;
