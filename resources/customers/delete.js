cancelUnless(me, "You must be logged in to do this.", 401);

var _this = this;

var query = {
    'id': {$ne: null},
    'customer.id': this.id
};

dpd.orders.del(query, function(res,err) {
    if (err) throw err;
    console.log('Removed ' + res.count +  ' orders for customer: ' + _this.name);
});
