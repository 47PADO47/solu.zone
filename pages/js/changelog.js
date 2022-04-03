console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', '"changelog.js" file loaded');

const repo = '47PADO47/solu.zone';

async function fetchChangelog() {
    const al = document.getElementById('alert');

    const res = await fetch(`https://api.github.com/repos/${repo}/contents/CHANGELOG.md`);

    if (res.status !== 200) {
        console.log('%c [ERROR] %c fetchChangelog() failed', 'font-size: 1.5em; color: #ff0000;', '');
        al.hidden = false;
        al.innerText = 'Errore di connessione ❌';
        return;
    };
    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'fetch() returned');

    const data = await res.json().catch(err => {
        console.log('%c [ERROR] %c fetchChangelog() failed (non-json)', 'font-size: 1.5em; color: #ff0000;', '');
        al.hidden = false;
        al.innerText = 'Errore di connessione ❌';
    });
    return data;
};

async function updateHTML() {
    const al = document.getElementById('alert');

    const data = await fetchChangelog();
    if (!data) return console.log('%c [ERROR] %c updateHTML() failed (!data)', 'font-size: 1.5em; color: #ff0000;', '');
    const text = atob(data.content);

    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'Changelog loaded');
    
    const div = document.getElementById('changelog');
    try {
        const html = marked.parse(text);
        div.innerHTML = html;

        console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'Parsed text and updated HTML');
    } catch (error) {
        console.log('%c [ERROR] %c updateHTML() failed (can\'t parse)', 'font-size: 1.5em; color: #ff0000;', '');
        al.hidden = false;
        al.innerText = 'Can\'t parse changelog ❌';
    };
    return console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', 'updateHTML() finished');
};