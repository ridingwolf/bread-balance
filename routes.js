var router = require('express').Router(),
	core = require('./core'),
	api_root = '/?',
	_ = require('lodash');

function send(res, rawData, data){
	if(rawData.Error)
		res.status(500).send(rawData.Error).end();
	else
		res.status(200).send(data || rawData).end();	
}

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
			.join('/');
			methods = methods.length > 0 ? methods + ':' : '';



			return methods + layer.route.path;
		});	

  	send(res, { 'bread-balance' : routes });
});

router.get('/balance', function(req, res){
	core.getBalance(function callback(data){
		send(res, data);
	});
});

router.post('/buy/:breads', function(req, res){
	core.buyBreads(req.params.breads, function callback(data){
		send(res, data);
	});	
});

router.get('/pay/:amount', function(req, res){
	res.send('amount payed back ....; ToDo: implement and return status, change to post');
});

module.exports = router;