/**
 * Created by Danny Schreiber on 2/17/15.
 */
var mongoose = require('mongoose');
var User = require('../models/user/user');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback(){
        console.log(config.db + ' has been opened');
    });

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({firstName: 'Danny', lastName: 'Schreiber', email: 'danny@ravenartmedia.com', password: 'changeme'});
        }
    });
};