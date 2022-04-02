const author = '47PADO47';
const repoName = 'solu.zone';
const repo = author + '/' + repoName;
const path = 'books';

window.onload = async () => {
    const al = document.getElementById('alert');
    const booksDiv = document.getElementById('books');
    
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`);
    const data = await res.json().catch(err => {
        console.log(err);
        al.setAttribute('hidden', false);
        al.innerText = 'Errore di connessione';
    });

    const books = data.filter(book => book.name.endsWith('.md'));
    books.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style = 'max-width: 18rem; margin: 2rem; min-width: 10em; border-radius: 20px;';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.innerText = book.name.replace('.md', '');

        const cardLink = document.createElement('a');
        cardLink.classList.add('btn');
        cardLink.classList.add('btn-primary');
        cardLink.innerHTML = 'Go <i class="fa-solid fa-arrow-right">';
        cardLink.href = `https://${author}.github.io/${repoName}/${path}/${book.name}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardLink);
        card.appendChild(cardBody);

        booksDiv.appendChild(card);
    });
};