const { createInterface } = require('readline');
const fs = require('fs');

const ask = (question) => new Promise((resolve) => {
  const interface = createInterface(process.stdin, process.stdout);

  interface.question(question, (answer) => {
    interface.close();

    resolve(answer);
  });
});

const exists = (path) => new Promise((resolve) => fs.access(path, fs.constants.F_OK, err => resolve(!err)));

module.exports = {
  ask,
  exists,
};