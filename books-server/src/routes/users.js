import express from 'express';
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendConfirmationEmail } from '../mailer';
import { renderToString } from 'react-dom/server';

const router = express.Router();

router.post('/', (req, res) =>
{
  const  email  = req.body.email;
  const  password  = req.body.password;
  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user.save()
    .then( user => {
      sendConfirmationEmail(user);
      res.json({ user: user.toAuthJSON() });
    })
    .catch(err =>{
      const fail = err.errors.email.message;
      return(
        res.status(400)
          .json({ errors:fail })
      );
    });
});


export default router;
