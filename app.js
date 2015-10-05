var _ = require('lodash'),
	routes = require('./routes/api'),
	app = require('express')(),
	port = 3030;

_.forEach(process.argv, function(argument){
	if(argument === '--staging')
		port = 3025;
});
 
app.listen(port);
app.use('/', routes);

app.use(function(req, res, next) {
    var err = new Error('Requested Page Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;