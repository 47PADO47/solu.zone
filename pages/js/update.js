console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', '"update.js" file loaded');

function checkInstallation() {
    const installDiv = document.getElementById('install-div');
    if (navigator.serviceWorker.controller) {
        console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', 'ServiceWorker is already installed');
        installDiv.style.display = 'none';
    }
}