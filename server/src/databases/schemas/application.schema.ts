import { Application } from '@packages/types';
import { Schema } from 'mongoose';

export const ApplicationSchema = new Schema<Application>({
    message: { type: String, required: true },
    createdAt: { type: Date, required: true },
    positionId: { type: Schema.Types.ObjectId, ref: 'Position', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});