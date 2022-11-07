const fs = require('fs/promises');
const crypto = require('crypto');
const path = require('path');

const dirPath = path.resolve(__dirname, '..', 'talker.json');

function createToken() {
  return crypto.randomBytes(8).toString('hex');
}

const talkerReader = async () => JSON.parse(await fs.readFile(dirPath, 'utf-8'));

const idReader = async (id) => {
  const data = await talkerReader();
  return data.find((i) => i.id === id);
};

const addPerson = async (person) => {
  const infos = await talkerReader();
  const id = infos[infos.length - 1].id + 1;
  const newPerson = { ...person, id };
  infos.push(newPerson);
  await fs.writeFile(dirPath, JSON.stringify(infos, null, 2));
  return newPerson;
};

const editPerson = async (id, { name, age, talk }) => {
  const infos = await talkerReader();
  const person = infos.find((p) => p.id === +id);
  const personEdit = { ...person, name, age, talk };
  const newEditPerson = infos.map((i) => i.id !== +id);
  newEditPerson.push(personEdit);
  await fs.writeFile(dirPath, JSON.stringify(newEditPerson, null, 2));
  return personEdit;
};

const deletePerson = async (id) => {
  const infos = await talkerReader();
  const filteredPersons = infos.filter((p) => p.id !== +id);
  const personDeleted = { ...filteredPersons };
  const othersPersons = infos.map((i) => i.id !== +id);
  await fs.writeFile(dirPath, JSON.stringify(othersPersons, null, 2));
  return personDeleted;
};

const searchPerson = async (item) => {
  const infos = await talkerReader();
  const result = infos.filter((p) => p.name.toLowerCase().includes(item.toLowerCase()));
  return result;
};

module.exports = {
  talkerReader,
  idReader,
  createToken,
  addPerson,
  editPerson,
  deletePerson,
  searchPerson,
};
