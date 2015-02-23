/**
 * Created by Danny Schreiber on 2/17/15.
 */
var path = require('path');
var express = require('express');
var rootPath = path.normalize(__dirname  + '../../../');

module.exports = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 3002
    },
    production: {
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};
