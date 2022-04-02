const repo = '47PADO47/solu.zone';
const url = (name) => `https://api.github.com/repos/${repo}/contents/books/${name}.json`

async function fetchBook(name) {
    const al = document.getElementById('alert');

    const res = await fetch(url(name));
    const data = await res.json().catch(err => {
        console.log(err);
        al.setAttribute('hidden', false);
        al.innerText = 'Errore di connessione';
    });
    return data;
};

async function updateHTML() {
    const path = location.pathname.split('/').pop();
    const book = await fetchBook(path);

    const content = atob(book.content);
    const json = JSON.parse(content);

    const { name, units, data } = json;

    const title = document.getElementById('title');
    title.innerText = name;

    const div = document.getElementById('container');
    data.forEach(element => {
        if (units) {
            const unit = document.createElement('h1');
            unit.innerText = "Unità"+element[0];

            const br = document.createElement('br');
            
            div.appendChild(unit);
            div.appendChild(br);
            div.appendChild(br);

            element.forEach((page, i) => {
                if (i == 0) return;
                const h3 = document.createElement('h3');
                h3.innerText = "Pag. " + page[0];
                div.appendChild(h3);

                const exercises = document.createElement('div');
                page.forEach((exercise, i) => {
                    if (i == 0) return;
                    const p = document.createElement('p');
                    p.innerText = exercise;

                    exercises.appendChild(p);
                });
                div.appendChild(exercises);
            });
        } else {
            data.forEach(page => {
                const h3 = document.createElement('h3');
                h3.innerText = "Pag. " + page[0];
                div.appendChild(h3);

                const exercises = document.createElement('div');
                page.forEach((exercise, i) => {
                    if (i == 0) return;
                    const p = document.createElement('p');
                    p.innerText = exercise;

                    exercises.appendChild(p);
                });
                div.appendChild(exercises);
            });
        };
    });
};
