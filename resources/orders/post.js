this.orderDate = new Date();
var _this = this;

dpd.counters.post('orderid', {seq: {$inc: 1}}, function(res, err) {
  if(err) return console.log(err);
  _this.orderId = res.seq;
});