var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
	res.render('index');
});
router.get('/login', function (req, res) {
	res.render('login');
});

router.get('/customers', function (req, res) {
	res.render('customers');
});

router.get('/jobs', function (req, res) {
	res.render('jobs');
});

module.exports = router;