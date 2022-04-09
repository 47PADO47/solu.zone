console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', '"book.js" file loaded');

const url = (name) => `https://47pado47.github.io/solu.zone/books/${name}.json`

async function fetchBook(name) {
    const al = document.getElementById('alert');

    const res = await fetch(url(name));

    if (res.status !== 200) {
        console.log('%c [ERROR] %c fetchBook() failed', 'font-size: 1.5em; color: #ff0000;', '');
        al.hidden = false;
        al.innerText = 'Errore di connessione ❌';
        return;
    };
    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'fetch() returned');

    const data = await res.json().catch(err => {
        console.log('%c [ERROR] %c fetchBook() failed (non-json)', 'font-size: 1.5em; color: #ff0000;', '');
        al.hidden = false;
        al.innerText = 'Errore di connessione ❌';
    });
    return data;
};

async function updateHTML() {
    const path = location.pathname.split('/').pop().replace('.html', '');
    const book = await fetchBook(path);

    const {
        name,
        units,
        data
    } = book;

    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'book loaded');

    const title = document.getElementById('title');
    title.innerText = name;
    title.style = 'text-align:center;';

    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'Updated title');

    const div = document.getElementById('container');
    data.forEach(element => {
        if (!units) return handleHTML(element, div);
        const unit = document.createElement('h1');
        unit.innerText = "Unità" + element[0];

        const br = document.createElement('br');

        div.appendChild(unit);
        div.appendChild(br);
        div.appendChild(br);

        return element.forEach((page, i) => {
            if (i == 0) return;
            handleHTML(page, div);
        });
    });
    return console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', 'Updated content');
};

function goToPage() {
    const input = document.getElementById('input');
    const page = input.value;
    window.location.href = `${window.location.origin}${window.location.pathname}#page${page}`;

    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', `goToPage(${page}) called`);
};

function handleHTML(page, div) {
    if (!page) return console.log('%c [ERROR]', 'font-size: 1.5em; color: #ff0000;', 'handleHTML() failed (no page passed)');
    const h3 = document.createElement('h3');
    h3.innerText = "Pag. " + page[0];
    h3.id = `page${page[0]}`;
    div.appendChild(h3);

    const exercises = document.createElement('div');
    page.forEach((exercise, i) => {
        if (i == 0) return;

        var number = parseInt(exercise).toString();
        if (exercise[number.length] == '.') number = number.slice(0, number.length - 1);
        if (number.length > 2) number = number.slice(0, 2);

        const dots = exercise.slice(number.length).split('.').join('.<br>');
        const commas = dots.split(',').join(',<br>');
        const final = commas.split(';').join(';<br>');

        const p = document.createElement('p');
        p.innerHTML = `<b>${number})</b> ${final}`;

        exercises.appendChild(p);
    });
    div.appendChild(exercises);
};