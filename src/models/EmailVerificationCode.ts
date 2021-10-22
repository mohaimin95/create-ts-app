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

const EmailVerificationCode = mongoose.model('EmailVerificationCode', schema);

export default EmailVerificationCode;
