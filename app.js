var _ = require('lodash'),
	routes = require('./routes/api'),
	app = require('express')(),
	port = 3030;

_.forEach(process.argv, function(argument){
	if(argument === '--staging')
		port = 3025;
});

app.set('port', port)
app.use('/', routes);
app.listen(app.get('port'), function(){ console.log('API running on port:' + app.get('port')); });

app.use(function(req, res, next) {
    var err = new Error('Requested Page Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;