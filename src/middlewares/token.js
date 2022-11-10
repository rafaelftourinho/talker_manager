const { tokenMessage, tokenLength } = require('../utils/messages');

const TOKEN_LENGTH = 16;

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: tokenMessage });
  if (authorization.length < TOKEN_LENGTH) return res.status(401).json({ message: tokenLength });
  next();
};

module.exports = tokenValidation;
