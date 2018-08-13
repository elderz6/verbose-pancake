import nodemailer from 'nodemailer';

const from = 'Books app <test@test.com>';

function setup()
{
  let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  return transport;
}

export function sendConfirmationEmail(user)
{
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: 'confirmation Email',
    text: `Confirm \n  ${user.generateConfirmURL()}`
  };
  transport.sendMail(email);
}
