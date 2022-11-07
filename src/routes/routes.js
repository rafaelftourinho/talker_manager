const express = require('express');

const { talkerReader,
  idReader,
  createToken,
  addPerson,
  editPerson,
  deletePerson,
  searchPerson } = require('../utils/index');

const { emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation, 
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation } = require('../utils/validation');

const routes = express.Router();
const HTTP_OK_STATUS = 200;

routes.get('/talker/search', tokenValidation, async (req, res) => {
  const { q } = req.query;
  const searchedPerson = await searchPerson(q);
  return res.status(HTTP_OK_STATUS).json(searchedPerson);
});

routes.get('/talker', async (_req, res) => {
  const data = await talkerReader();
  return res.status(HTTP_OK_STATUS).send(data);
});

routes.get('/talker/:id', async (req, res) => {
  const personId = req.params.id;
  const talkerId = await idReader(+personId);
  if (!talkerId) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).send(talkerId);
});

routes.post('/login', emailValidation, passwordValidation, async (_req, res) => {
  const loginToken = createToken();
  return res.status(HTTP_OK_STATUS).json({ token: loginToken });
});

routes.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
async (req, res) => {
  const person = await addPerson(req.body);
  return res.status(201).json(person);
});

routes.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
watchedAtValidation,
rateValidation,
async (req, res) => {
  const { params: { id }, body } = req;
  const personEdit = await editPerson(id, body);
  return res.status(HTTP_OK_STATUS).json(personEdit);
});

routes.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { params: { id }, body } = req;
  const personDeleted = await deletePerson(id, body);
  return res.status(204).json(personDeleted);
});

module.exports = routes;
