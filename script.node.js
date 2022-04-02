const fs = require('fs');
const units = false;
var txtDividevByUnits;

const text = fs.readFileSync('text.txt', 'utf-8');

if(units) txtDividevByUnits = text.split('Unit');
else txtDividevByUnits = [text];

const txtDividedByPages = txtDividevByUnits.map((unit) => unit.split('Pag. '));
const txtDividedByEs = txtDividedByPages.map((page) => page.map((page) => page.split('Es. ')));

const json = JSON.stringify(txtDividedByEs, null, 2);

fs.writeFile('exercises.json', json, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});