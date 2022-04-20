console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', '"info.js" file loaded');

async function fetchApi() {
    const repo = document.getElementById('repo').href.split('github.com/')[1];
    const al = document.getElementById('alert');

    const res = await fetch(`https://api.github.com/repos/${repo}`);

    if (res.status !== 200) {
        console.log('%c [ERROR] %c fetchApi() failed', 'font-size: 1.5em; color: #ff0000;', '');
        al.hidden = false;
        al.innerText = 'Errore di connessione ❌';
        return;
    };
    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'fetch() returned');

    const data = await res.json().catch(err => {
        console.log('%c [ERROR] %c fetchApi() failed (non-json)', 'font-size: 1.5em; color: #ff0000;', '');
        al.hidden = false;
        al.innerText = 'Errore di connessione ❌';
    });
    return data;
};

async function updateHTML() {
    const data = await fetchApi();
    if (!data) return console.log('%c [ERROR] %c updateHTML() failed (!data)', 'font-size: 1.5em; color: #ff0000;', '');

    const {owner, stargazers_count, open_issues} = data;
    console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'Github api data loaded');
    
    document.getElementById('ownerImg').src = owner.avatar_url;
    document.getElementById('ownerName').innerText = owner.login;
    document.getElementById('ownerUrl').href = owner.html_url;

    document.getElementById('stars').innerText = stargazers_count;
    document.getElementById('issues').innerText = open_issues;
    
    return console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', 'updateHTML() finished');
};