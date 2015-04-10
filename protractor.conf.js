module.exports.config = {
    specs: ['test/e2e/**/*.spec.js'],

    framework: 'mocha',

    mochaOpts: {
        reporter: 'spec',
        enableTimeouts: false
    },

    //mochaOpts: {
    //    ui: 'bdd',
    //    reporter: 'list',
    //    slow: 3000,
    //    enableTimeouts: false
    //},

    capabilities: {
        'browserName': 'chrome'
    },

    onPrepare: function() {
        global.dv = browser.driver;

        global.isAngularSite = function(flag) {
            browser.ignoreSynchronization = !flag;
        };
    },

    //rootElement: '',

    //multiCapabilities: [
    //    { 'browserName': 'chrome' },
    //    { 'browserName': 'firefox' },
    //    { 'browserName': 'ie' }
    //]

    baseUrl: 'http://localhost:8000/',

    params: {
        login: {
            username: 'grinderusr1416591626@apixio.net',
            password: 'apixio.123'
        }
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};
