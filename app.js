var routes = require('./routes'),
	app = require('express')(),
	port = process.env.PORT || 3000;

app.use(require('gnu-terry-pratchett')()); //won't do much unless the api starts serving pages
app.use('/', routes);

app.use(function(request, response, next) {
    response
    	.status(404)
    	.send('Requested Page Not Found');
});

app.listen(port, function () { 
	console.log('Running API (port ' + port + ')'); 
});