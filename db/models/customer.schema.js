var mongoose = require('mongoose');

var customer = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  created: {type: Date, default: Date.Now}
});

mongoose.model('Customer', customer);
