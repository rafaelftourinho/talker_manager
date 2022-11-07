const express = require('express');
const bodyParser = require('body-parser');
const { talkerReader, idReader } = require('./utils/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await talkerReader();
  return res.status(HTTP_OK_STATUS).send(data);
});

app.get('/talker/:id', async (req, res) => {
  const personId = req.params.id;
  const talkerId = await idReader(+personId);
  if (!talkerId) return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).send(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
