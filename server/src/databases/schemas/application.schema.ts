import { Application } from '@packages/types';
import { Schema } from 'mongoose';

export const ApplicationSchema = new Schema<Application>({
    message: { type: String, required: true },
    createdAt: { type: Date, required: true}
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate to get positions
ApplicationSchema.virtual('position', {
    ref: 'Position',
    localField: '_id',
    foreignField: 'positionId'
});