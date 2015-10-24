'use strict';

var express = require('express'),
	custRoutes = require('./routes/customer.js'),
	app = express();

// Routers
app.use(express.static(__dirname +  '/www'));
app.use('/api/customers', custRoutes);

// Listen Port
// Add a config file and read this from config
var port = 8080;

var server = app.listen(port, function(err){
	if(err){
		throw err;
	}

	console.log("OMS started on port: " + port);
});
