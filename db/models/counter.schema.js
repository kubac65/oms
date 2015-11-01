var mongoose = require('mongoose');

var counter = mongoose.Schema({
  _id: {type: String, required: true, index: {unique: true}},
  seq: {type: Number, required: true}
});

mongoose.model('Counter', counter);

module.exports = mongoose.model('Counter');
