import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import auth from './routes/auth';
import users from './routes/users';

dotenv.config();

const port = 8080;
const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

app.use('/api/users', users);
app.use('/api/auth', auth);

app.get('/*', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log('running on port ', port));
