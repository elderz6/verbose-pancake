import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) =>
{
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);
  user.save()
    .then( user => console.log(user))
    .catch(err => res.json({ err }));
});

export default router;
