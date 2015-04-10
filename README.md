Angular / Browserify / Bootstrap Seed Project
=============================================

The back-end is written using node - to get rid of it, remove

* server.js
* server/


Installation
============

Run the following in the root of the project

### Application
1. npm install
1. bower install
1. gulp

Then visit *http://localhost:8080/*

### Test Assets

##### Karma
1. npm install -g karma-cli
1. karma start

##### Protractor
1. npm install -g protractor mocha 
1. webdriver-manager update
1. webdriver-manager start *(this must stay running while you are running your protractor tests)*
1. protractor
