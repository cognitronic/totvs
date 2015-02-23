/**
 * Created by Danny Schreiber on 2/15/15.
 */

// set up ======================================================================
var express = require('express');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);


require('./server/config/routes')(app);

require('./server/config/mongoose')(config);

require('./server/models/user/user');

require('./server/config/passport')();



app.listen(config.port);
console.log("App listening on port " + config.port);