var _ = require('lodash'),
	routes = require('./routes'),
	app = require('express')();

app.use(require('gnu-terry-pratchett')()); //won't do much unless the api starts serving pages
app.use('/', routes);

app.use(function(request, response, next) {
    response
    	.status(404)
    	.send('Requested Page Not Found');
});

module.exports.run = function(){
	var port = process.env.PORT || 3000; 
	app.listen(port, function () { console.log('Running API (port ' + port + ')'); });
}