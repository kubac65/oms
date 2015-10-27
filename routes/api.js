'use strict';

var express = require('express'),
		router = express.Router();

router.get('/', function (req, res) {
	res.end('text');
});

router.get('/t1', function (req, res) {
	res.end('text1');
});

module.exports = router;
