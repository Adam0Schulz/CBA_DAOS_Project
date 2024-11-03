import { Schema, Document, Types } from 'mongoose';

export interface Ensemble extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

export const EnsembleSchema = new Schema<Ensemble>({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
