import Logger from './Logger.js';
const installButton = document.getElementById('install-button');
const installDiv = document.getElementById('install-div');

if (navigator.serviceWorker) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            Logger.success('ServiceWorker registration successful');
            await registration.pushManager.subscribe()
            .then(() => Logger.success('PushManager subscription successful'))
            .catch(() => Logger.error('PushManager subscription failed'));
        } catch (error) {
            Logger.error('ServiceWorker registration failed');
        };
    });

    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        Logger.success('beforeinstallprompt fired');
    });

    installButton.addEventListener('click', async (event) => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        outcome === 'accepted' ? Logger.success('User accepted install prompt') : Logger.error('User dismissed install prompt');
        deferredPrompt = null;
    });

    window.addEventListener('appinstalled', (event) => {
        Logger.success('App installed');
        installDiv.style.display = 'none';
    });

} else Logger.error('ServiceWorker is not supported');