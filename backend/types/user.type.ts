import { Region } from "./regions.type.ts";

export interface IUser extends Document {
  email: string;
  name: string;
  isPremium: boolean;
  regions: Region[];
}