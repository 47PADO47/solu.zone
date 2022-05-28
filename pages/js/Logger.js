class Logger {
    static success (message = "") {
        console.log('%c [SUCCESS]', 'font-size: 1.5em; color: #00ff00;', message);
    };

    static error (message = "") {
        console.log('%c [ERROR]', 'font-size: 1.5em; color: #ff0000;', message);
    };

    static info (message = "") {
        console.log('%c [INFO]', 'font-size: 1.5em; color: #800080;', message);
    };
};

export default Logger;