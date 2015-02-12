var fs = require('fs');

var debtFile = '../debt.json',
paymentsFile = '../payments.json';

function collectDebtData(getDataCallback){
	fs.exists(debtFile, function (exists){
		if(exists){
			fs.readFile(debtFile, function processJsonFile(err, data){
				if(err){
					getDataCallback({ "error" : err.toString() });
				}
				
				try{
					getDataCallback(JSON.parse(data))
				}
				catch(ex){
					getDataCallback({ "error" : ex.toString()});
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
			updateDebtsCallback({ 'error' : err.toString() });
		else
			updateDebtsCallback(data);
		});
	}
	catch(ex){
		updateDebtsCallback({ 'error' : ex.toString() });
	}
}

function updatePayments(data, updatePaymentsCallback){
	try{
		fs.writeFile(debtFile, JSON.stringify(data, null, '\t'), function callBack(err){
		if(err)
			updatePaymentsCallback({ 'error' : err.toString() });
		else
			updatePaymentsCallback(data);
		});
	}
	catch(ex){
		updatePaymentsCallback({ 'error' : ex.toString() });
	}
}

module.exports.collectDebtData = collectDebtData;
module.exports.updateDebts = updateDebts;
module.exports.updatePayments = updatePayments;