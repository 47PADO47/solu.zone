console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', '"books.js" file loaded');

const author = '47PADO47';
const repoName = 'solu.zone';
const repo = author + '/' + repoName;
const path = 'books';

async function getBooks() {

    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'getBooks() called');

    const al = document.getElementById('alert');
    const booksDiv = document.getElementById('books');
    
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`);
    
    if (res.status !== 200) {
        console.log('%c [ERROR] %c getBooks() failed', 'font-size: 1.5em; color: #ff0000;', '');
        al.setAttribute('hidden', false);
        al.innerText = 'Errore di connessione';
        return;
    };
    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'fetch() returned');

    const data = await res.json().catch(err => {
        console.log('%c [ERROR] %c getBooks() failed (non-json)', 'font-size: 1.5em; color: #ff0000;', '');
        al.setAttribute('hidden', false);
        al.innerText = 'Errore di connessione';
    });

    const books = data.filter(book => book.name.endsWith('.json'));
    books.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style = 'max-width: 18rem; margin: 2rem; min-width: 10em; border-radius: 20px;';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = book.name.replace('.json', '');

        const cardLink = document.createElement('a');
        cardLink.classList.add('btn');
        cardLink.classList.add('btn-primary');
        cardLink.innerHTML = 'Go <i class="fa-solid fa-arrow-right">';
        cardLink.href = `https://${author}.github.io/${repoName}/pages/${book.name.replace('.json', '')}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardLink);
        card.appendChild(cardBody);

        booksDiv.appendChild(card);

        return console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', `book ${book.name} added`);
    });
    return console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', 'Updated books!');
};