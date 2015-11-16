var _this = this;

var query = {
    id: {$ne: null},
    custId: _this.custId
};

dpd.orders.del(query, function(res,err) {
    if (err) throw err;
    console.log('Removed orders for customer: ' + _this.name);
});