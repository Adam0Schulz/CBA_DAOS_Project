import { Document, Types } from "mongoose";
import { Position } from "./position";

export interface Ensemble extends Document {
  name: string;
  description: string;
  positions: Types.ObjectId[] | Position[];
}

export interface EnsembleCore {
  _id?: string;
  name: string;
  description: string;
  positions: string[];
}
