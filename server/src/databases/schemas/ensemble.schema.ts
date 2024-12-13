import { Ensemble } from '@packages/types';
import { Schema, Document, Types } from 'mongoose';

export const EnsembleSchema = new Schema<Ensemble>({
  name: { type: String, required: true },
  description: { type: String, required: false},
  positions: [{ type: Schema.Types.ObjectId, ref: 'Position', required: true}]
});
