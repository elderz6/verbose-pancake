import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';

const router = express.Router();

router.post('/', (req, res) =>
{
  const  email  = req.body.email;
  const  password  = req.body.password;
  const user = new User({ email });
  user.setPassword(password);
  user.save()
    .then( user => res.json({ user: user.toAuthJSON() }))
    .catch(err =>{
      return (
        console.log(err),
        res.status(400)
          .json({ errors: parseErrors(err.errors) })
      );
    }
    );
});

export default router;
