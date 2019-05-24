const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
let data = JSON.parse(dataBuffer.toString());
data = {
  ...data,
  name: 'Stacey',
  age: 75
};
fs.writeFileSync('1-json.json', JSON.stringify(data));
