import { model, Schema, Types } from 'mongoose';

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    imageUrls: [String],
    categories: [
      {
        type: Types.ObjectId,
        ref: 'Category',
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Item = model('Item', schema);

export default Item;
