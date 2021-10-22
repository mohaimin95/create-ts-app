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

const ResetPasswordCode = mongoose.model('ResetPasswordCode', schema);

export default ResetPasswordCode;
