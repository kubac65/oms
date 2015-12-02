cancelUnless(me, "You must be logged in to do this.", 401);

this.created = new Date();
var _this = this;

dpd.counters.post('customerid', {seq: {$inc: 1}}, function(res, err) {
  if(err) return console.log(err);
  _this.custId = res.seq;
});
