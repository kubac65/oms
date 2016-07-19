(function(){
	'use strict';

	var express = require('express');
	var http = require('http');
	var deployd = require('deployd');
	var io = require('socket.io');

	var PORT = process.env.PORT || 8090;
	var DB = process.env.DB || 'mongodb://localhost/oms';
	var ENV = process.env.ENV || 'development';

	// Import routes
	var pdfRoutes = require('./routes/pdf_generator.js')

	var app = express();
	app.use(express.static(__dirname +  '/www'));
	app.use('/pdf', pdfRoutes);

	// Set up Deployd middleware
	var server = http.createServer(app);
	var ioServer = io.listen(server, {'log level': 0})
	var api = deployd.attach(server, {
		env: ENV,
		socketIo: ioServer,
		db: {
			connectionString: DB
		}
	});
	app.use(server.handleRequest);

	server.listen(PORT, function(err){
		if(err){
			throw err;
		}

		console.log("OMS started on port: " + PORT);
	});


})();
