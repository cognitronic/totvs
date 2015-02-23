/**
 * Created by Danny Schreiber on 2/17/15.
 */

var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');

module.exports = function(){

    passport.use('local', new LocalStrategy(
        function(username, password, callback){
            console.log('inside passport');
            User.findOne({email: username}).exec(function(err, user){
                if (err) { return callback(err); }
                // No user found with that username
                if (!user) { return callback(null, false); }

                // Make sure the password is correct
                user.verifyPassword(password, function(err, isMatch) {
                    if (err) { return callback(err); }

                    // Password did not match
                    if (!isMatch) { return callback(null, false); }

                    // Success
                    return callback(null, user);
                });
            });
        }
    ));

    passport.serializeUser(function(user, done){
        if(user){
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done){
        User.findOne({_id: id}).exec(function(err, user){
            if(user){
                return done(null, user);
            }
            return done(null, false);
        });
    });
};