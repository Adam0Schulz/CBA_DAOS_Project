import { Document, Types } from "mongoose";
import {Position, PositionCore} from "./position";

export interface Ensemble extends Document {
  name: string;
  description: string;
  positions: Types.ObjectId[] | Position[];
}

export interface EnsembleCore {
  _id?: string;
  name: string;
  description: string;
  positions: PositionCore[];
}
export interface EnsembleIn extends EnsembleCore{
  userId: string;
  instrumentId: string;
}
