import Logger from "./Logger.js";

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
} else Logger.error('ServiceWorker is not supported');