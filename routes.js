var router = require('express').Router(),
	core = require('./core'),
	api_root = '/?',
	version = require('./package.json').version || 'unknown',
	_ = require('lodash'),
	handler = require('./responseHandler'),
	payment_routes = require('./paying/routes'),
	buy_routes = require('./buying/routes');

function getRoutes(stack, route_prefix){
	var routes = stack
		.filter(function (layer){ 
			return layer && layer.route && layer.route.path && layer.route.path != api_root; 
		})
		.map(function(layer){
			var methods = _.map(layer.route.methods || {}, function(active, method){
				return active ? method : null;
			})
			.filter(function(method){ return method && method.length > 0; })
			.join('/') + '::';

			return methods + route_prefix + layer.route.path;
		});

	var partial_routes = stack
		.filter(function(layer){
			return layer && layer.handle && layer.handle.stack;
		})
		.map(function(layer){
			var capturedPath = layer
				.regexp
				.toString()
				.replace(/^\/\^/, '')
				.replace(/\\\//g, '/')
				.replace(/\/\?\(\?=\/\|\$\)\/i/, '');

			var prefix = route_prefix.replace(/\/$/, '') + capturedPath 
			return getRoutes(layer.handle.stack, prefix);
		});

	return routes
		.concat(partial_routes)
		.reduce(function(a, b){ return a.concat(b);}, []);
}

router.get(api_root, function(req, res) {
	var routes = getRoutes(router.stack, '');	

  	handler.send(res, { 
		'version' : version, 
  		'routes' : routes 
  	});
});

router.get('/balance', function(req, res){
	core.getBalance(function callback(data){
		handler.send(res, data);
	});
});

router.use('/buy', buy_routes);
router.use('/pay', payment_routes);

module.exports = router;