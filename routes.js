var router = require('express').Router(),
	core = require('./core');

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
		res.status(500).send(rawData.Error).end();
	else
		res.status(200).send(data || rawData).end();	
}

router.get('/?', function(req, res) {
  	send(res, { 'bread-balance' : api_list });
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