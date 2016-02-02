var router = require('express').Router(),
	core = require('../core'),
	getEnvironment =  function (){ throw new Error('getEnvironment function was not set') };

var api_list = {
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
		}
};

function send(res, rawData, data){
	if(rawData.Error)
		res.status(500).send(rawData.Error);
	else
		res.status(200).send(data || rawData).end();	
}

router.get('/?', function(req, res) {
  	var result = {};
  	result['bread-balance API(' + getEnvironment() + ')'] = api_list;
  	send(res, result);
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
	res.send('amount payed back .... <br>todo: implement and return status, change to post');
});

router.get('/test', (req, res) => {
	require('fs').realpath('./', (err, resolvedPath) => {
  		if (err) 
  			throw err;
		
		console.log(resolvedPath);
		res.send(resolvedPath);
	});
});

module.exports = router;

//helper to imject the current environmnet
module.exports.forEnvironment = function forEnvironment(getEnv) { getEnvironment = getEnv; };