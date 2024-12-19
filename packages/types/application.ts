import { Document, Types } from "mongoose";
import {Position, PositionCore} from "./position";

export interface Application extends Document {
    position: Types.ObjectId | Position;
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
