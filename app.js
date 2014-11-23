var routes = require('./routes/api');
var app = require('express')();

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Requested Page Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;