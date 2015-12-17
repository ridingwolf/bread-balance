var _ = require('lodash'),
	routes = require('./routes/api'),
	app = require('express')();

app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Requested Page Not Found');
    err.status = 404;
    next(err);
});

app.listen(app.get('port'), function () { console.log('API running on port:' + app.get('port')); });
module.exports = app;