import { ObjectId } from 'mongoose';

export interface IUser {
  _id?: ObjectId;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isEmailVerified?: Boolean;
}
