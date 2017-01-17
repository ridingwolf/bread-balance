var router = require('express').Router(),
	core = require('../core'),
	handler = require('../responseHandler');

router.post('/:breads', function(req, res){
	core.buyBreads(req.params.breads, function callback(data){
		handler.send(res, data);
	});	
});

module.exports = router;