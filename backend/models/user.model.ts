import mongoose from 'mongoose';
import { Region } from '../types/regions.type';
import { IUser } from '../types/user.type';


const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  regions: {
    type: [String],
    enum: Object.values(Region),
    default: [],
  },
});



export default mongoose.model('User', userSchema);
