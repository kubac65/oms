var mongoose = require('mongoose');

var order = mongoose.Schema({
  orderDate: {type: Date, required: true},
  dueDate: {type: Date, required: true},
  status: {type: String, default: 'incomplete'},
  items: [orderItem]
});

var orderItem = mongoose.Schema({
  description: {type: String, required: true},
  quantity: {type: Number, required: true, min: 1},
  unitPrice: {type: Number},

});

mongoose.model('Order', schema);
