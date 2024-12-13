import { Ensemble } from '@packages/types';
import { Schema, Document, Types } from 'mongoose';

export const EnsembleSchema = new Schema<Ensemble>({
  name: { type: String, required: true },
  description: { type: String, required: false}
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate to get positions
EnsembleSchema.virtual('positions', {
  ref: 'Position',
  localField: '_id',
  foreignField: 'ensemble_id'
});