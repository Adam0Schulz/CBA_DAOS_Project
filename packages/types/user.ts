import { Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLoggedInAt: Date | null;
}

export interface UserCore {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

