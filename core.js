var _ = require('lodash');
var data = require('./data');

var unitPrice = 1.0;

function getBalance(sendData){
	data.collectDebtData(function createBalance(data){
		if(data.error){
			sendData(data);
			return;
		}

		var balance = 0.0;
		_.forEach(data, function addToTotal(log){
			balance -= log.price;
		});

		sendData({ 
			'balance' : balance,
			'history' : data
		});
	});
}

function buyBreads(numberOfBreads, sendData){
	data.collectDebtData(function updateDebt(debt){
		try {

			var today = getDateKey(new Date(Date.now())),
			breads = Number(numberOfBreads),
			item = { 
				'breads' : breads, 
				'price' : breads * unitPrice 
			};

			if(debt[today]){
				item.breads += debt[today].breads;
				item.price += debt[today].price;
			}
			debt[today] = item;
			data.updateDebtData(debt, sendData);
		}
		catch(ex){
			sendData({ 'error' : ex.toString() });
		}

	});
}

function getDateKey(date){
	return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}

module.exports.getBalance = getBalance;
module.exports.buyBreads = buyBreads;