'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Customer = mongoose.model('Customer')


// Get all
router.get('/', function(req, res){
  res.send(_customers);
});

// Get existing
router.get('/:id', function(req, res){
  Customer.create({
    name: req.params.id,
    address: req.params.id,
    email: req.params.id,
    phone: req.params.id,
  }, function(err, cust){
    if(err) throw err;
      res.send(cust);
  });
});

// Create new
router.put('/', function(req, res){
  console.log(req.body);
  var custoner = req.body;
  Customer.create({
    name: custoner.name,
    address: custoner.address,
    email: custoner.email,
    phone: custoner.phone,
  }, function(err, cust){
    if(err) throw err;
      res.send(cust);
      console.log('Customer added');
      console.log(cust)
  });
});

// Update existing
router.post('/:id', function(req, res){
  //req.params.id
});

// Delete existing
router.delete('/:id', function(req, res){
  //req.params.id
});


var _customers = [
  {
    "id": 1,
    "name": "Jakub i",
    "address": "24 N Main Street, Cork",
    "phone": "0862548795",
    "email": "test@test.com",
    "jobOrders": [
      {
        "id" : 1,
        "orderDate": "10-08-25",
        "dueDate": "15-35-25",
        "order-ref": "Tomasz",
        "notes": "dupa dupa dupa",
        "total": 1234.12,
        "items": [
          {
            "description": "plexa 10x10",
            "quantity": 2,
            "unitPrice": 10.99,
            "subtotal": 21.89
          },
          {
            "description": "poster",
            "quantity": 20,
            "unitPrice": 1.50,
            "subtotal": 30
          },

        ]
      },
      {
        "id" : 2,
        "orderDate": "10-08-25",
        "dueDate": "15-35-25",
        "order-ref": "Tomasz tt",
        "notes": "dupa dupa dupa",
        "total": 12343123.12,
        "items": [
          {
            "description": "plexa 10x10",
            "quantity": 2,
            "unitPrice": 10.99,
            "subtotal": 21.89
          },
          {
            "description": "poster",
            "quantity": 20,
            "unitPrice": 1.50,
            "subtotal": 30
          }
        ]
      }
    ]
  }
];

module.exports = router;
