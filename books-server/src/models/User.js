import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema(
  {
    email : { type: String, required: true, lowercase:true, unique:true },
    pwHash : { type: String, required: true },
    confirmed: { type:Boolean, default:false}
  },{ timestamps: true }
);

userSchema.methods.isValidPassword = function isValidPassword(password)
{
  return bcrypt.compareSync(password, this.pwHash);
};

userSchema.methods.setPassword = function setPassword(password)
{
  this.pwHash = bcrypt.hashSync(password, 10);
};

userSchema.methods.generateJWT = function generateJWT()
{
  return jwt.sign(
    {
      email: this.email
    },process.env.JWT_SECRET
  );
};

userSchema.methods.toAuthJSON = function toAuthJSON()
{
  return {
    email: this.email,
    confirmed:this.confirmed,
    token:this.generateJWT()
  };
};

userSchema.plugin(uniqueValidator, { message: 'email already in use'});

export default mongoose.model('User', userSchema);
