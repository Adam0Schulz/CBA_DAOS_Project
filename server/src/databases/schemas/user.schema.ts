import { Schema } from 'mongoose';
import { User } from "@packages/types"


export const UserSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLoggedInAt: { type: Date },
});
