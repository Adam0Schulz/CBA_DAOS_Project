import { Schema, Types, Document } from 'mongoose';

export interface Instrument extends Document {
  name: string;
}

export const InstrumentSchema = new Schema<Instrument>({
  name: { type: String, required: true },
}, {
  timestamps: true,
});
