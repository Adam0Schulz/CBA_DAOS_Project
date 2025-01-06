import { Position } from '@packages/types';
import { Schema} from 'mongoose';

export const PositionSchema = new Schema<Position>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false},
    ensembleId: { type: Schema.Types.ObjectId, ref: 'Ensemble', required: true},
    instrumentId: { type: String, required: true},
    isOwner: { type: Boolean, required: true }
});