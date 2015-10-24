'use strict';

var express = require('express'),
    router = express.Router();

// Get all
router.get('/', function(req, res){

});

// Get existing
router.get('/:id', function(req, res){
  res.status(200).send({id: req.params.id, name: 'kuba'});
});

// Create new
router.put('/:id', function(req, res){
  //req.params.id
});

// Update existing
router.post('/:id', function(req, res){
  //req.params.id
});

// Delete existing
router.delete('/:id', function(req, res){
  //req.params.id
});

module.exports = router;
