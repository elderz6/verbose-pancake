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

//Confirmation token setup
userSchema.methods.setConfirmationToken = function setConfirmationToken()
{
  this.confirmationToken = this.generateJWT();
};

//Generate confirmation URL
userSchema.methods.generateConfirmURL = function generateConfirmURL() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

//Generate JSON Web Token
userSchema.methods.generateJWT = function generateJWT()
{
  return jwt.sign({ email: this.email },
    process.env.JWT_SECRET
  );
};

userSchema.methods.toAuthJSON = function toAuthJSON()
{
  const token = this.generateJWT();
  if (token !== undefined) {
    return {
      email: this.email,
      confirmed:this.confirmed,
      token:token
    };
  }
  else {
    return({ errors: 'Something went wrong'});
  }
};

userSchema.plugin(uniqueValidator, { message: 'Email already in use'});

export default mongoose.model('User', userSchema);
