var router = require('express').Router(),
	handler = require('../responseHandler');

router.get('/:amount', function(req, res){
	handler.send(res, {}, req.params.amount + ' amount payed back ....; ToDo: implement and return status, change to post');
});

module.exports = router;