import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import auth from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();
const port = 8080;
const app = express();
app.use(bodyParser.json());
app.use('/api/auth', auth);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

app.get('/*', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log('running on port ', port));
