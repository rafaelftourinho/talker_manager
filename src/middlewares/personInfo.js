const { emailMessage,
  regexEmailMessage,
  passwordMesage,
  passwordLength } = require('../utils/messages');

const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const MIN_CHAR = 6;

const emailValidation = (req, res, next) => {
  const personEmail = req.body.email;
  if (!personEmail) return res.status(400).json({ message: emailMessage });
  if (!regexEmail.test(personEmail)) return res.status(400).json({ message: regexEmailMessage });
  next();
};

const passwordValidation = (req, res, next) => {
  const personPassword = req.body.password;
  if (!personPassword) return res.status(400).json({ message: passwordMesage });
  if (personPassword.length < MIN_CHAR) return res.status(400).json({ message: passwordLength });
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
};
