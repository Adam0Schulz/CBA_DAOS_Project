import { Document, Types } from "mongoose";

export interface FrontendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface ExtendedFrontendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  address?: string;
  description?: string;
  instrumentId?: Types.ObjectId;
  applicationId?: Types.ObjectId;
  isOpenToWork: boolean;
  lastLoggedIn?: Date | null;
}