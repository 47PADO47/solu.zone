const log = (...args) => console.log('%c[SW]', 'font-size: 1.5em; color: white;background-color: #5539cc;', ...args);

self.addEventListener("install", event => {
   log("Service worker installed");
});

self.addEventListener("activate", event => {
   log("Service worker activated");
});