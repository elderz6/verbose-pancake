import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email : { type: String, required: true, lowercase:true },
    pwHash : { type: String, required: true }
  },{ timestamps: true }
);

userSchema.methods.isValidPassword = function isValidPassword(password)
{
  return bcrypt.compareSync(password, this.pwHash);
};

export default mongoose.model('User', userSchema);
