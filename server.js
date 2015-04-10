/*globals __dirname, process*/

// MODULES
//==============================================================================

var express    = require('express')
,   app        = express()
,   bodyParser = require('body-parser')
,   port       = process.env.PORT || 8080
,   SERVER     = __dirname + '/server'
,   DIST       = __dirname + '/dist';


// SERVER CONFIG
//==============================================================================

app.use(express.static(DIST));

app.set('views', __dirname);
app.set('view engine', 'jade');
app.set('port', port);


// MIDDLEWARE
//==============================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', DIST);
app.set('view engine', 'jade');


// DB SETUP
//==============================================================================

var db = require(SERVER + '/config/db');
db.connect();

// MODELS
var models = {
    Product: require(SERVER + '/models/product'),
};


// ROUTES
//==============================================================================

app
    .get('/', function(req, res) {
        'use strict';
        res.sendFile(DIST);
    });


require(SERVER + '/routes')(express.Router(), app, models);


// KICK THE TIRES AND LIGHT THE FIRES
//==============================================================================

module.exports = app;
