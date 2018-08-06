import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) =>
{
  const credentials = req;
  User.findOne({ email: credentials.email})
    .then(user => {
      if (user) {
        console.log('success');
      }
      else {
        res.status(400).json({
          errors: { global: 'invalid credentials' }
        });
      }
    });
});

export default router;
