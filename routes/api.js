var router = require('express').Router();
var core = require('../core');

function send(res, rawData, data){
	if(rawData.error)
		res.send(rawData.error, 500);
	else
		res.send(data || rawData).end();	
}

router.get('/', function(req, res) {
  res.send('bread balance API-root', 200);
});

router.get('/balance', function(req, res){
	core.getBalance(function callback(data){
		send(res, data);
	});
});

// switch to post
router.get('/buy/:breads', function(req, res){
	core.buyBreads(req.params.breads, function callback(data){
		send(res, data, 200);
	});	
});

router.get('/pay/:amount', function(req, res){
	res.send('amount payed back .... <br>todo: implement and return status, change to post');
});

module.exports = router;