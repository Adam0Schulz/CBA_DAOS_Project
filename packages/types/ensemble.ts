import { Document, Types } from "mongoose";
import { User } from "./user";

export interface Ensemble extends Document {
  name: string;
  description: string;
  createdBy: Types.ObjectId | User;
  members: Types.ObjectId[] | User[];
}

export interface EnsembleCore {
  _id?: string;
  name: string;
  description: string;
  createdBy: string; // User ID
  members: string[]; // Array of User IDs
}
