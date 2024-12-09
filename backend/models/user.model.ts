import mongoose from 'mongoose';
import { Region } from '../types/regions.type';

const userSchema = new mongoose.Schema({
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
  isPremium: {
    type: Boolean,
    default: false,
  },
});



export default mongoose.model('User', userSchema);
