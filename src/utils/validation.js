const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
const MIN_CHAR = 6;
const TOKEN_LENGTH = 16;

const emailValidation = (req, res, next) => {
  const personEmail = req.body.email;
  if (!personEmail) return res.status(400).send({ message: 'The "email" field is required' });
  if (!regexEmail.test(personEmail)) {
    return res.status(400).send({ message: 'The "email" must have the format "email@email.com"' });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const personPassword = req.body.password;
  // console.log(typeof personPassword);
  if (!personPassword) return res.status(400).send({ message: 'The "password" field is required' });
  if (personPassword.length < MIN_CHAR) {
    return res.status(400).send({ message: 'The "password" must be at least 6 characters long' });
  }
  next();
};

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) return res.status(401).send({ message: 'Token was not found' });
  if (authorization.length < TOKEN_LENGTH) {
    return res.status(401).send({ message: 'Invalid token' });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  tokenValidation,
};
