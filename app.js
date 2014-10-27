var express = require('express');
var path = require('path');

var routes = require('./routes/index');
var app = express();

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;