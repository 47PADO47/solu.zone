console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', '"link.js" file loaded');

const repoUrl = "https://github.com/47PADO47/solu.zone";

function updateLinks() {
    const baseUrl = location.href.split('/pages')[0];
    const links = [{
            name: "Home",
            url: baseUrl,
            array: false,
            component: document.getElementById('home'),
        },
        {
            name: "Repo",
            url: repoUrl,
            array: false,
            component: document.getElementById('repo'),
        },
        {
            name: "Books",
            url: `${baseUrl}/pages/books`,
            array: false,
            component: document.getElementById('books'),
        },
        {
            name: "BookList",
            url: baseUrl,
            array: true,
            component: document.querySelectorAll('.book'),
        },
    ];

    links.forEach(link => {
        if (!link.component) return console.log(`%c [ERROR] %c updateLinks("${link.name}") failed (!component)`, 'font-size: 1.5em; color: #ff0000;', '');

        if (!link.array) link.component.href = link.url;
        else if (link.component.length == 0) return console.log(`%c [ERROR] %c updateLinks("${link.name}") failed (array.length == 0)`, 'font-size: 1.5em; color: #ff0000;', '');
        else link.component.forEach(component => component.href = link.url + decodeURI(component.href).split('{url}')[1]);
        
        return console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', `updateLinks("${link.name}") finished`);
    });

    return console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', 'updateLinks() finished');
};