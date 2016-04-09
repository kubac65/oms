(function() {
  'use strict';

  angular.module('oms.orders')
    .service('OrdersService', OrdersService);

  OrdersService.$inject = ['$q'];

  function OrdersService($q){
    this.statuses = [
      {
        id: 'quotation',
        title: 'Quotation'
      },
      {
        id: 'ready for design',
        title: 'Ready for Design'
      },
      {
        id: 'on proof',
        title: 'On Proof'
      },
      {
        id: 'ready to print',
        title: 'Ready To Print'
      },
      {
        id: 'finishing',
        title: 'Finishing'
      },
      {
        id: 'completed',
        title: 'Completed'
      }
    ];

    var _this = this;

    this.getAll = function(collection) {
      var defer = $q.defer();

      dpd.orders.get()
        .then(function success(res) {
          defer.resolve(res);
        }, function error(err) {
          defer.reject(err);
        });

      return defer.promise;
    };

    this.add = function(order) {
      var defer = $q.defer();

      dpd.orders.post(angular.copy(order))
        .then(function success(res) {
          defer.resolve(res);
        }, function error(err) {
          defer.reject(err);
        });

      return defer.promise;
    };

    this.update = function(order) {
      var defer = $q.defer();

      dpd.orders.put(order.id, {
        customer: {
          id: order.customer.id,
          name: order.customer.name
        },
        orderDate: order.orderDate,
        dueDate: order.dueDate,
        status: order.status,
        items: order.items,
        total: order.total,
        ref: order.ref
      })
        .then(function success(res) {
          defer.resolve(res);
        }, function error(err) {
          defer.reject(err);
        });

      return defer.promise;
    };

    this.remove = function(order) {
      var defer = $q.defer();

      dpd.orders.del(order.id)
        .then(function success(res) {
          var index = _this.orders.indexOf(order);
          _this.orders.splice(index, 1);
          defer.resolve();
        }, function error(err){
          defer.reject(err);
        });

      return defer.promise;
    };
  }
})();
