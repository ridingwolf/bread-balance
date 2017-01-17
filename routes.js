var router = require('express').Router(),
	core = require('./core'),
	api_root = '/?',
	_ = require('lodash'),
	handler = require('./responseHandler');

router.get(api_root, function(req, res) {
	var routes = router
		.stack
		.filter(function (layer){ 
			return layer.route.path && layer.route.path != api_root; 
		})
		.map(function(layer){
			var methods = _.map(layer.route.methods || {}, function(active, method){
				return active ? method : null;
			})
			.filter(function(method){ return method && method.length > 0; })
			.join('/') + ':';

			return methods + layer.route.path;
		});	

  	handler.send(res, { 
		'version' : require('./package.json').version || 'unknown', 
  		'routes' : routes 
  	});
});

router.get('/balance', function(req, res){
	core.getBalance(function callback(data){
		handler.send(res, data);
	});
});

router.post('/buy/:breads', function(req, res){
	core.buyBreads(req.params.breads, function callback(data){
		handler.send(res, data);
	});	
});

router.get('/pay/:amount', function(req, res){
	handler.send(res, {}, 'Amount payed back ....; ToDo: implement and return status, change to post');
});

module.exports = router;