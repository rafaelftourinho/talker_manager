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

module.exports = {
  talkerReader,
  idReader,
  createToken,
};
