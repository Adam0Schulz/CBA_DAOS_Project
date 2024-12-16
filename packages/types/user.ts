import { Document, Types } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserCore {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
