const fs = require('fs');
const { ask } = require('./constants');

(async () => {

    var replace;
    const question = await ask('Do you want to replace each file? (y/n) ');
    if (question === 'y') replace = true;
    else replace = false;

    console.log(`Replacing files (${replace ? 'all' : 'only new'}) 🔁`);

    const template = fs.readFileSync('./bin/template.html', 'utf-8');
    fs.readdirSync(`../books/`)
        .filter(file => file.endsWith('.json'))
        .forEach(file => {
            const f = file.replace('.json', '');

            if (replace) {
                fs.writeFileSync(`../pages/${f}.html`, template);
                return console.log(`File ${f}.html replaced ☑️`);
            };

            if (fs.existsSync(`../pages/${f+".html"}`)) return console.log(`Page "${f}" already exists ☑️`);
    
            console.log(`Page "${f}" does not exist ❌`);
            console.log(`Generating page "${f}" ...`);

            fs.writeFileSync(`../pages/${f}.html`, template);
            return console.log(`File ${f}.html generated ☑️`);
        });
    return console.log('Done!');
})();