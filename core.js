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
		balance = 0.0,
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
				item.Breads += debt[today].Breads;
				item.Price += debt[today].Price;
			}
			debt[today] = item;
			
			if(debt['Error']){
				debt['Error'] = null;
				delete debt['Error'];
			}


			data.updateDebts(debt, sendData);
		}
		catch(ex){
			sendData({ 'Error' : ex.toString() });
		}
 
	});
}

function payAmount(amount, sendData){
	// don't remove from debt, only add to payed.
	//testdrive keeping the right balance after a payment
}

function getDateKey(date){
	return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}

module.exports.getBalance = getBalance;
module.exports.buyBreads = buyBreads;
module.exports.payAmount = payAmount;