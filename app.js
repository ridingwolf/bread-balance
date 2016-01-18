var _ = require('lodash'),
	routes = require('./routes/api'),
	app = require('express')(),
	currentEnvironment;

routes.forEnvironment(function(){ return currentEnvironment; });
app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Requested Page Not Found');
    err.status = 404;
    next(err);
});

module.exports.run = function(environment, port){ 
	currentEnvironment = environment.toUpperCase();
	app.listen(port, function () { console.log('Running ' + currentEnvironment +' API (port ' + port + ')'); });
} 