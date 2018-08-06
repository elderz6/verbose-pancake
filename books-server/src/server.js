import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import auth from './routes/auth';

const port = 8080;
const app = express();
app.use(bodyParser.json());
app.use('/api/auth', auth);

mongoose.connect('mongodb://joaozin:admin123@ds133621.mlab.com:33621/mern_shop123')
  .then(() => console.log('connected'))
  .catch(err => console.log(err));

app.get('/*', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log('running on port ', port));
