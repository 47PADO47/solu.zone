console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', '"update.js" file loaded');

function checkInstallation() {
    const installDiv = document.getElementById('install-div');
    const prompt = document.getElementById('install-prompt');
    const instructions = document.getElementById('install-instructions');
    const alert = document.getElementById('alert');
    
    const hide = () => installDiv.style.display = 'none';

    if (!navigator.serviceWorker) {
        alert.hidden = false;
        alert.innerText = 'ServiceWorker is not supported ❌';
        return hide();
    }
    if (navigator.standalone) return hide();
    if (window.matchMedia('(display-mode: standalone)').matches) return hide();
    if (isIOS()) return prompt.style.display = 'none';
    else return instructions.style.display = 'none';
}

function isIOS() {
    return navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
}