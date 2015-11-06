(function(){
	'use strict';

	var express = require('express');
	var mongoose = require('mongoose');
	var bodyParser = require('body-parser');

	var deployd = require('deployd');
	var options = {
		port: 9000,
		db: {
			connectionString: 'mongodb://localhost/oms'
		}
	}

	var dpd = deployd(options);
	dpd.listen();


	var	custRoutes = require('./routes/customer.js');

	var dbHost = 'mongodb://localhost/oms';
	var port = 8090;

	mongoose.connect(dbHost, function(err){
		if (err){
			throw err;
		}
		console.log('Connected to MongoDB');

		var app = express();

		// Register middleware
		app.use(bodyParser.json());

		// Routers
		app.use(express.static(__dirname +  '/www'));
		app.use('/api/customers', custRoutes);

		app.listen(port, function(err){
			if(err){
				throw err;
			}

			console.log("OMS started on port: " + port);
		});
	});
})();
