import { Schema, Document } from 'mongoose';

export interface UserDetail extends Document {
  user: Schema.Types.ObjectId;
  address: string;
  description: string;
}

export const UserDetailSchema = new Schema<UserDetail>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String },
  description: { type: String },
});
