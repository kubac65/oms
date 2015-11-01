var mongoose = require('mongoose');
var Counter = require('./counter.schema.js');

var customer = mongoose.Schema({
  _id: {type: Number, required: true, default: 0, index: {unique: true}},
  name: {type: String, required: true},
  address: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  created: {type: Date, default: Date.now}
});

customer.pre('save', function(done){
  var cust = this;
  // Generate new sequential customer id
  Counter.findByIdAndUpdate('customerid', {$inc: {seq: 1}}, {new: true, upsert: true}, function(err, doc){
    if (err) throw err;
    console.log('Counter object'+ doc);
    cust._id = doc.seq;
    done();
  });
});

mongoose.model('Customer', customer);

module.exports = mongoose.model('Customer');
