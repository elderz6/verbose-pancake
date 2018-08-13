import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema(
  {
    email : {
      type: String,
      required: true,
      lowercase:true,
      index:true,
      unique:true
    },
    pwHash : { type: String, required: true },
    confirmed: { type:Boolean, default:false},
    confirmationToken: { type: String, default:''}
  },
  { timestamps: true }
);

userSchema.methods.isValidPassword = function isValidPassword(password)
{
  return bcrypt.compareSync(password, this.pwHash);
};

userSchema.methods.setPassword = function setPassword(password)
{
  this.pwHash = bcrypt.hashSync(password, 10);
};

userSchema.methods.setConfirmationToken = function setConfirmationToken()
{
  this.confirmationToken = this.generateJWT();
};

userSchema.methods.generateConfirmURL = function generateConfirmURL() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

userSchema.methods.generateJWT = function generateJWT()
{
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET
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
