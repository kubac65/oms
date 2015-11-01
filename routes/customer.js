'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
// Register models
var Customer = require('../db/models/customer.schema.js');


// Get all
router.get('/', function(req, res){
  Customer.find({}, function(err, customers){
    console.log(customers);
    res.send(customers);
  });

});

// Get existing
router.get('/:id', function(req, res){
  Customer.findOne({'_id': req.params.id}, function(err, customer) {
    console.log(customer);
    res.send(customer);
  });
});

// Create new
router.put('/', function(req, res){

  var customer = req.body;

  Customer.create(customer, function success(err, cust){
    if (err) {
      // TODO check if error is caused by duplicate index, if it is, try to create it again
      res.status(500).send('Internal failure occured, administrator have been notified');
      throw err;
    }
    console.log('Customer added: ');
    console.log(cust);

    // When succesfull return status code 201 and customer object
    res.status(201).send(cust);
  });
});

// Update existing
router.post('/:id', function(req, res){
  //req.params.id
});

// Delete existing
router.delete('/:id', function(req, res){
  Customer.findByIdAndRemove(req.params.id, function(err, cust){
    if (err) throw err;
    console.log('Customer deleted: ');
    console.log(cust)
    res.status(200).send(cust);
  })
});

module.exports = router;
