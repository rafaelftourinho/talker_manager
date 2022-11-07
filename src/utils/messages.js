const emailMessage = 'O campo "email" é obrigatório';
const regexEmailMessage = 'O "email" deve ter o formato "email@email.com"';
const passwordMesage = 'O campo "password" é obrigatório';
const passwordLength = 'O "password" deve ter pelo menos 6 caracteres';
const tokenMessage = 'Token não encontrado';
const tokenLength = 'Token inválido';
const nameMessage = 'O campo "name" é obrigatório';
const nameLength = 'O "name" deve ter pelo menos 3 caracteres';
const ageMessage = 'O campo "age" é obrigatório';
const ageLength = 'A pessoa palestrante deve ser maior de idade';
const talkMessage = 'O campo "talk" é obrigatório';
const watchedAtMessage = 'O campo "watchedAt" é obrigatório';
const watchedAtFormat = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const rateMessage = 'O campo "rate" é obrigatório';
const rateRange = 'O campo "rate" deve ser um inteiro de 1 à 5';

module.exports = {
  emailMessage,
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
  rateRange,
};
