(function(){
  'use strict';

  var express = require('express'),
      router = express.Router();


  var pdfGenerator = require('../services/pdf_generator.js');

  router.get('/advice', function(req, res){
    //Generate view
    //res.download('app.js', '')
    res.send('Test');
    res.end();
  });

  router.get('/invoice', function(req, res){
    //Generate view

    res.end('invoice');
  });

  module.exports = router;
})();
