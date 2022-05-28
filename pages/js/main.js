import Logger from "./Logger.js";
const installButton = document.getElementById("install");

if (navigator.serviceWorker) {
    window.addEventListener('load', async () => {
        try {
            await navigator.serviceWorker.register('/sw.js');
            Logger.success('ServiceWorker registration successful');
        } catch (error) {
            Logger.error('ServiceWorker registration failed');
        };
    });
} else Logger.error('ServiceWorker is not supported');

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
});

installButton.addEventListener('click', async () => {
    deferredPrompt.prompt();
    const { result } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    result === 'accepted' ? Logger.success('User accepted the install prompt') : Logger.error('User dismissed the install prompt');
});