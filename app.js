(function(){
	'use strict';

	var express = require('express');
	var bodyParser = require('body-parser');
	var http = require('http');
	var deployd = require('deployd');

	var PORT = process.env.PORT || 8090;
	var DB = process.env.DB || 'mongodb://dev.dsrms.com/oms';
	var ENV = process.env.NODE_ENV || 'development';

	var app = express();

	// Register middleware
	app.use(express.static(__dirname +  '/www'));
	app.use(bodyParser.json());

	// Set up Deployd middleware
	var server = http.createServer(app);
	var api = deployd.attach(server, {
		env: ENV,
		db: {
			connectionString: DB
		}
	});
	app.use(server.handleRequest);

	app.listen(PORT, function(err){
		if(err){
			throw err;
		}

		console.log("OMS started on port: " + PORT);
	});
})();
