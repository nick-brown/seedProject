/*globals __dirname, process*/
// MODULES
//==============================================================================
var express    = require('express')
  , app        = express()
  , bodyParser = require('body-parser')
  , port       = process.env.PORT || 8080;


// APP CONFIG
//==============================================================================
app.use(express.static(__dirname + '/dist'));

app.set('views', __dirname);
app.set('view engine', 'jade');
app.set('port', port);

// MIDDLEWARE
//==============================================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/dist/');
app.set('view engine', 'jade');


// DB SETUP
//==============================================================================
var db = require('./config/db');
db.connect();

// MODELS
var models = {
    //Product: require('./app/models/product'),
};


// ROUTES
//==============================================================================
app
    .get('/', function(req, res) {
        'use strict';
        res.sendFile(__dirname + '/dist/index.html');
    });


require('./app/routes')(express.Router(), app, models);


// KICK THE TIRES AND LIGHT THE FIRES
//==============================================================================
module.exports = app;
