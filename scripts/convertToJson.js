const fs = require('fs');
const { ask } = require('./constants');

(async () => {
    var units, txtDividedByUnits;

    const name = await ask('What is the title of the book? ');

    const question = await ask('Do you want to divide by units? (y/n) ');
    if (question === 'y') units = true;
    else units = false;

    const text = fs.readFileSync('./bin/text.txt', 'utf-8');

    if(units) txtDividedByUnits = text.split('Unit');
    else txtDividedByUnits = [text];

    const txtDividedByPages = txtDividedByUnits.map((unit) => unit.split('Pag. '));
    const txtDividedByEs = txtDividedByPages.map((page) => page.map((page) => page.split('Es. ')));

    const json = JSON.stringify({name: name.replace('_', " ").toUpperCase(), units, data: txtDividedByEs}, null, 4);

    fs.writeFile(`../books/${name}.json`, json, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
})();