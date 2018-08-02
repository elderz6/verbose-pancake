import express from 'express';
import path from 'path';

const port = 8080;
const app = express();

app.post('/api/auth', (req, res) =>
{
  res.status(400).json({
    errors: { global : 'invalid credentials'}
  });
});

app.get('/*', (req, res) =>
{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => console.log('running on port ', port));
