/*globals exports*/
exports.config = {
    specs: ['test/e2e/**/*.spec.js'],
    framework: 'mocha',
    mochaOpts: {
        reporter: 'spec'
    //    slow: 3000,
    //    enableTimeouts: false
    },
    capabilities: { 'browserName': 'chrome' }
    //multiCapabilities: [
    //    { 'browserName': 'chrome' },
    //    { 'browserName': 'firefox' },
    //    { 'browserName': 'ie' }
    //]
    //baseUrl: 'http://localhost:8080',
    //seleniumAddress: 'http://localhost:4444/wd/hub'
};
