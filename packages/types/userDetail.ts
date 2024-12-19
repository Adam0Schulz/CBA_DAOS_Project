import { Document, Types } from "mongoose";

export interface UserDetail extends Document {
  userId: Types.ObjectId;
  address?: string;
  description?: string;
  instrumentId?: Types.ObjectId;
  application?: Types.ObjectId;
  isOpenToWork: boolean;
  lastLoggedIn?: Date | null;
}
