var express = require('express'),
	app = express(),
	consolidate = require('consolidate'),
	routes = require('./routes/default.js'),

app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '../../views');

// Routers
app.use(express.static(__dirname +  '../../static'));
app.use('/', routes);

// Listen Port
var port = 8080;

var server = app.listen(port, function(err){
	if(err){
		throw err;
	}

	console.log("Express started on port: " + port);
});