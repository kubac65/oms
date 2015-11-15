var _this = this;
console.log('dd');
console.log(_this);

var query = {"custId":_this.custId};

dpd.customers.get(query, function (result) {
  _this.customer = result[0];
  
  console.log('dd1');
  console.log(_this);
});