var fs = require('fs');

var debtFile = 'debt.json';

function collectDebtData(getDataCallback){
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

function updateDebtData(data, updateDebtDataCallback){
	try{
		fs.writeFile(debtFile, JSON.stringify(data), function callBack(err){
		if(err)
			updateDebtDataCallback({ 'error' : err.toString() });
		else
			updateDebtDataCallback(data);
		});
	}
	catch(ex){
		updateDebtDataCallback({ 'error' : ex.toString() });
	}
}

module.exports.collectDebtData = collectDebtData;
module.exports.updateDebtData = updateDebtData;