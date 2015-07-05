'use strict';

var express = require('express'),
	apiRoutes = require('./routes/api.js'),
	app = express();

// Routers
app.use(express.static(__dirname +  '/www'));
app.use('/api', apiRoutes);

// Listen Port
// Add a config file and read this from config
var port = 8080;

var server = app.listen(port, function(err){
	if(err){
		throw err;
	}

	console.log("OMS started on port: " + port);
});
