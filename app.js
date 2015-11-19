(function(){
	'use strict';

	var express = require('express');
	var bodyParser = require('body-parser');

	var deployd = require('deployd');

	// Set up Deployd
	var options = {
		port: 9000,
		db: {
			connectionString: 'mongodb://dev.dsrms.com/oms'
		}
	}

	var dpd = deployd(options);
	dpd.listen();

	var app = express();

	// Register middleware
	app.use(bodyParser.json());

	// Routers
	app.use(express.static(__dirname +  '/www'));

	var port = process.env.PORT || 8090;


	app.listen(port, function(err){
		if(err){
			throw err;
		}

		console.log("OMS started on port: " + port);
	});
})();
