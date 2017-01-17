module.exports.send = function (response, rawData, data){
	if(rawData.Error)
		response.status(500).send(rawData.Error).end();
	else
		response.status(200).send(data || rawData).end();	
}