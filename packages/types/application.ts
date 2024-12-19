import { Document, Types } from "mongoose";
import {Position, PositionCore} from "./position";

export interface Application extends Document {
    positionId: Types.ObjectId | Position;
    userId: Types.ObjectId;
    message: string;
    createdAt: Date;
}

export interface ApplicationCore {
    _id?: string;
    message: string;
    positionId: string;
    createdAt: Date;
}

export interface ApplicationIn extends ApplicationCore {
    userId: string;
}
