const fs = require('fs');
const { ask, exists } = require('./constants');

(async () => {

    var all;
    const question = await ask('Do you want to format every book? (y/n) ');
    if (question == 'y') all = true;
    else all = false;

    if (all) return fs.readdirSync('../books').filter((book => book.endsWith('.json'))).forEach(format);

    const title = await ask('What is the name of the book? ');
    const res = await exists(`../books/${title}.json`);
    if (!res) return console.log(`Book "${title}" does not exist ❌`);
    format(title+'.json');
})();

function format(title) {
    console.log(`Formatting ${title}...`);

    const file = fs.readFileSync(`../books/${title}`, 'utf-8')
    const json = JSON.parse(file);
    const {
        name,
        units,
        data
    } = json;
    const arr = [];

    data.forEach(el => {
        if (!units) return handle(el, arr);

        const unitName = `Unit ${el[0]}`;
        const unitObj = {
            unit: unitName,
            pages: [],
        };

        el.forEach((page, index) => {
            if (index == 0) return;
            handle(page, unitObj.pages);
        });

        return arr.push(unitObj);
    });

    const txt = JSON.stringify({ name, units, data: arr}, null, 2);
    fs.writeFileSync(`./bin/${title}`, txt);

    return console.log(`${title} formatted ☑️`);
};

function handle(page, arr) {
    if (!page) return console.log('No data provided - handle() ❌');

    const pageName = `Page ${page[0]}`;
    const pageobj = {
        name: pageName,
        exercises: [],
    };
    
    page.forEach((exercise, index) => {
        if (index == 0) return;

        var number = parseInt(exercise).toString();
        if (exercise[number.length] == '.') number = number.slice(0, number.length - 1);
        if (number.length > 2) number = number.slice(0, 2);

        const dots = exercise.slice(number.length).split('.').join('.\n');
        const commas = dots.split(',').join(',\n');
        const text = commas.split(';').join(';\n');
        
        const exerciseobj = {
            number,
            text,
        };
        pageobj.exercises.push(exerciseobj);
    });
    arr.push(pageobj);
};