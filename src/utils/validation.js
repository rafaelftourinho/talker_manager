const { emailMessage,
  regexEmailMessage,
  passwordMesage,
  passwordLength,
  tokenMessage,
  tokenLength,
  nameMessage,
  nameLength,
  ageMessage,
  ageLength,
  talkMessage,
  watchedAtMessage,
  watchedAtFormat,
  rateMessage,
  rateRange } = require('./messages'); 

const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const MIN_CHAR = 6;
const TOKEN_LENGTH = 16;
const NAME_CHAR = 3;
const AGE_CHAR = 18;

const dateFormat = (date) => {
  const dataValidation = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  return dataValidation.test(date);
};

const emailValidation = (req, res, next) => {
  const personEmail = req.body.email;
  if (!personEmail) return res.status(400).send({ message: emailMessage });
  if (!regexEmail.test(personEmail)) return res.status(400).send({ message: regexEmailMessage });
  next();
};

const passwordValidation = (req, res, next) => {
  const personPassword = req.body.password;
  if (!personPassword) return res.status(400).send({ message: passwordMesage });
  if (personPassword.length < MIN_CHAR) return res.status(400).send({ message: passwordLength });
  next();
};

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) return res.status(401).send({ message: tokenMessage });
  if (authorization.length < TOKEN_LENGTH) return res.status(401).send({ message: tokenLength });
  next();
};

const nameValidation = (req, res, next) => {
  const personName = req.body.name;
  if (!personName) return res.status(400).send({ message: nameMessage });
  if (personName.length < NAME_CHAR) return res.status(400).json({ message: nameLength });
  next();
};

const ageValidation = (req, res, next) => {
  const personAge = req.body.age;
  if (!personAge) return res.status(400).json({ message: ageMessage });
  if (personAge < AGE_CHAR) return res.status(400).json({ message: ageLength });
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: talkMessage });
  next();
};

const watchedAtValidation = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) return res.status(400).json({ message: watchedAtMessage });
  if (!dateFormat(watchedAt)) return res.status(400).json({ message: watchedAtFormat });
  next();
};

const rateValidation = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!rate && rate !== 0) return res.status(400).json({ message: rateMessage });
  if (!([rate >= 1 && rate <= 5, Number.isInteger(rate)].every((i) => i === true))) {
    return res.status(400).json({ message: rateRange });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};
