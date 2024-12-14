import { Schema, Types, Document } from 'mongoose';

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLoggedInAt: Date;
  instrumentId?: Types.ObjectId;
  applicationId?: Types.ObjectId;
  isOpenToWork: boolean;
}

export const UserSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLoggedInAt: { type: Date },
  instrumentId: { type: Schema.Types.ObjectId, ref: 'Instrument' },
  applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
  isOpenToWork: { type: Boolean, default: false },
});
