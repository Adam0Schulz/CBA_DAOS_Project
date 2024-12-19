import { Schema, Types, Document } from 'mongoose';

export interface UserDetail extends Document {
  userId: Types.ObjectId;
  address?: string;
  description?: string;
  instrumentId?: Types.ObjectId;
  applicationId?: Types.ObjectId;
  isOpenToWork: boolean;
  lastLoggedIn?: Date | null;
}

export const UserDetailSchema = new Schema<UserDetail>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  address: { type: String, required: false },
  description: { type: String, required: false },
  instrumentId: { type: Schema.Types.ObjectId, ref: 'Instrument', required: false },
  applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: false },
  isOpenToWork: { type: Boolean, default: false },
  lastLoggedIn: { type: Date, default: null, required: false }
});

// Add a virtual getter for the application field
UserDetailSchema.virtual('application', {
  ref: 'Application',
  localField: 'applicationId',
  foreignField: '_id',
  justOne: true
});
