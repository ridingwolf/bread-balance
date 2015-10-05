var fs = require('fs');

var debtFile = './data/debt.json',
paymentsFile = './data/payments.json';

function collectDebtData(getDataCallback){
	fs.exists(debtFile, function (exists){
		if(exists){
			fs.readFile(debtFile, function processJsonFile(err, data){
				if(err){
					getDataCallback({ "Error" : err.toString() });
				}
				
				try{
					getDataCallback(JSON.parse(data))
				}
				catch(ex){
					getDataCallback({ "Error" : ex.toString()});
				}
			});			
		}
		else{
			getDataCallback({});
		}
	});
}

function updateDebts(data, updateDebtsCallback){
	try{
		fs.writeFile(debtFile, JSON.stringify(data, null, '\t'), function callBack(err){
		if(err)
			updateDebtsCallback({ 'Error' : err.toString() });
		else
			updateDebtsCallback(data);
		});
	}
	catch(ex){
		updateDebtsCallback({ 'Error' : ex.toString() });
	}
}

function updatePayments(data, updatePaymentsCallback){
	try{
		fs.writeFile(debtFile, JSON.stringify(data, null, '\t'), function callBack(err){
		if(err)
			updatePaymentsCallback({ 'Error' : err.toString() });
		else
			updatePaymentsCallback(data);
		});
	}
	catch(ex){
		updatePaymentsCallback({ 'Error' : ex.toString() });
	}
}

module.exports.collectDebtData = collectDebtData;
module.exports.updateDebts = updateDebts;
module.exports.updatePayments = updatePayments;