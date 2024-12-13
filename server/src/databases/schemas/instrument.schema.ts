import { Schema } from 'mongoose';

export interface Instrument {
  name: string;
}

export const InstrumentSchema = new Schema<Instrument>({
  name: { type: String, required: true },
}, {
  timestamps: true,
});
