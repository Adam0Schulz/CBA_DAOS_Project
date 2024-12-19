import { Document, Types } from "mongoose";

export interface Position extends Document {
    userId?: Types.ObjectId;
    ensembleId: Types.ObjectId;
    //TODO: implement instrumentId for reals
    instrumentId: string;
    isOwner: boolean
}
export interface PositionCore {
    _id: string,
    userId?: string,
    ensembleId: string,
    instrumentId: string,
    isOwner: boolean
}
