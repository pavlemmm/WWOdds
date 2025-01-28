import { Document } from "mongoose";
import { Region } from "./regions.type.ts";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  regions: Region[];
  isAdmin: boolean;
}
