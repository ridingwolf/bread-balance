var _ = require('lodash'),
	routes = require('./routes/api'),
	app = require('express')(),
	currentEnvironment;

routes.forEnvironment(function(){ return currentEnvironment; });

app.use(require('gnu-terry-pratchett')()); //won't do much unless the api starts serving pages
app.use('/', routes);

app.use(function(request, response, next) {
    response
    	.status(404)
    	.send('Requested Page Not Found');
});

module.exports.run = function(environment, port){ 
	currentEnvironment = environment.toUpperCase();
	app.listen(port, function () { console.log('Running ' + currentEnvironment +' API (port ' + port + ')'); });
} 