var _ = require('lodash');
var data = require('./data');

var unitPrice = 1.0;

function getBalance(sendData){
	data.collectDebtData(function createBalance(data){
		if(data.error){
			sendData(data);
			return;
		}

		var dates = Object.keys(data),
		balance = 0.0
		history = [];

		_.forEach(dates, function addToTotal(date){
			var purchase = data[date];
			if(purchase){
				balance -= purchase.Price;
				purchase['Date'] = date;
				history.push(purchase);
			}
		});

		sendData({ 
			'Balance' : balance,
			'History' : history
		});
	});
}

function getTestBalance(sendData){
	data.collectDebtData(function createBalance(data){
		if(data.error){
			sendData(data);
			return;
		}

		var dates = Object.keys(data),
		balance = 0.0
		history = [];

		_.forEach(dates, function addToTotal(date){
			var purchase = data[date];
			if(purchase){
				balance -= purchase.price;
				purchase['Date'] = date;
				history.push(purchase);
			}
		});

		sendData({ 
			'Balance' : balance
			//'history' : history
		});
	});
}


function buyBreads(numberOfBreads, sendData){
	data.collectDebtData(function updateDebt(debt){
		try {

			var today = getDateKey(new Date(Date.now())),
			breads = Number(numberOfBreads),
			item = { 
				'Breads' : breads, 
				'Price' : breads * unitPrice 
			};

			if(debt[today]){
				item.breads += debt[today].breads;
				item.price += debt[today].price;
			}
			debt[today] = item;
			
			if(debt['Error']){
				debt['Error'] = null;
				delete debt['Error'];
			}


			data.updateDebtData(debt, sendData);
		}
		catch(ex){
			sendData({ 'Error' : ex.toString() });
		}

	});
}

function getDateKey(date){
	return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}

module.exports.getBalance = getBalance;
module.exports.buyBreads = buyBreads;
module.exports.getTestBalance = getTestBalance;