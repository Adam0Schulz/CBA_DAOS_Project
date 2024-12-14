import { Document } from "mongoose";

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  lastLoggedInAt: Date | null;
  instrumentId?: string;
  applicationId?: string;
  isOpenToWork?: boolean;
  address?: string;
  description?: string;
}

export interface UserCore {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isOpenToWork?: boolean; 
}


export interface UserDetails {
  _id: string;
  userId: string;
  address: string;
  description: string;
}