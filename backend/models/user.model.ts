import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});



export default mongoose.model('User', userSchema);
