import { Schema, Types, Document } from 'mongoose';
import { User } from './user.schema';

export interface UserDetails extends Document {
  address: string;
  description: string;
  userId: Types.ObjectId | User;
}

export const UserDetailsSchema = new Schema<UserDetails>({
  address: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
});
