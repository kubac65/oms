(function(){
	'use strict';

	var express = require('express');
	var http = require('http');
	var deployd = require('deployd');
	var io = require('socket.io')

	var PORT = process.env.PORT || 8090;
	var DB = process.env.DB || 'mongodb://dev.dsrms.com/oms';
	var ENV = process.env.ENV || 'development';

	var app = express();

	app.use(express.static(__dirname +  '/www'));

	// Set up Deployd middleware
	var server = http.createServer(app);
	var api = deployd.attach(server, {
		env: ENV,
		socketIo: io.listen(server, {'log level': 0}),
		db: {
			connectionString: DB
		}
	});
	app.use(api.handleRequest);

	app.listen(PORT, function(err){
		if(err){
			throw err;
		}

		console.log("OMS started on port: " + PORT);
	});
})();
