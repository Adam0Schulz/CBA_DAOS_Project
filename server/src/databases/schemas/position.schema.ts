import { Position } from '@packages/types';
import { Schema, Document, Types } from 'mongoose';

export const PositionSchema = new Schema<Position>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false},
    ensemble: { type: Schema.Types.ObjectId, ref: 'Ensemble', required: true},
    isOwner: { type: Boolean, required: true }
});