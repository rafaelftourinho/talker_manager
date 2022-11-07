const fs = require('fs/promises');
const path = require('path');

const dirPath = path.resolve(__dirname, '..', 'talker.json');

const talkerRead = async () => JSON.parse(await fs.readFile(dirPath, 'utf-8'));

module.exports = {
  talkerRead,
};
