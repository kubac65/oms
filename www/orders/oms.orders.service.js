(function(){
  var app = angular.module('oms.orders.service', []);
  app.service('ordersService', function(){
    return {
      orders: _orders,
      /*add: function(customer){
        // Make request to backend
        this.customers.push(customer);
      },
      remove: function(customer){
        // Make request to backend
        var index = this.customers.indexOf(customer);
        this.customers.splice(index, 1);
      },
      update: function(customer){
        var index = this.customers.indexOf(customer);
      }*/
    }
  });



  var _orders = [
    {
      id: 1,
      customer: 'Jakub Potocki',
      details: '20x30 Poster, 20x30 Poster, 20x30 Poster',
      orderDate: "10-08-25",
      dueDate: "15-35-25",
      orderRef: "Tomasz",
      status: "In Progress"
    }
  ];
})();
