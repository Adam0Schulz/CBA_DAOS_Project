import { Document, Types } from "mongoose";
import { User } from "./user";
import { Ensemble } from "./ensemble";


export interface Position extends Document {
    user: Types.ObjectId | User;
    ensemble: Types.ObjectId | Ensemble;
    // TODO:
    // instrument: Types.ObjectId | Instrument;
    isOwner: boolean

}