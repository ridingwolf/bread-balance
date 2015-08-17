var router = require('express').Router();
var core = require('../core');

var api_list = {
	'bread-balance API' : {
		'balance' : {
			'method' : 'get',
			'parameters' : []
		},
		'buy' : {
			'method' : 'post',
			'parameters' : [ { 'breads' : 'double' } ]
		},
		'pay' : {
			'method' : 'post',
			'parameters' : [ { 'amount' : 'double' } ]
		},
	}
};

function send(res, rawData, data){
	if(rawData.error)
		res.status(500).send(rawData.error);
	else
		res.send(data || rawData).end();	
}

router.get('/?', function(req, res) {
  res
  	.status(200)
  	.send(api_list);
});

router.get('/balance', function(req, res){
	core.getBalance(function callback(data){
		send(res, data);
	});
});

router.post('/buy/:breads', function(req, res){
	core.buyBreads(req.params.breads, function callback(data){
		send(res, data, 200);
	});	
});

router.get('/pay/:amount', function(req, res){
	res.send('amount payed back .... <br>todo: implement and return status, change to post');
});

module.exports = router;