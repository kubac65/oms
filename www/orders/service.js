(function() {
  'use strict';

  angular.module('oms.orders')
    .service('OrdersService', OrdersService);

  OrdersService.$inject = ['$q'];

  function OrdersService($q){
    this.orders = [];
    this.statuses = [
      {
        value: 'quotation',
        label: 'Quotation'
      },
      {
        value: 'readyfordesign',
        label: 'Ready for Design'
      },
      {
        value: 'onproof',
        label: 'On Proof'
      },
      {
        value: 'readytoprint',
        label: 'Ready To Print'
      },
      {
        value: 'finishing',
        label: 'Finishing'
      },
      {
        value: 'completed',
        label: 'Completed'
      }
    ];

    var _this = this;

    this.getAll = function() {
      var defer = $q.defer();

      dpd.orders.get()
        .then(function success(res) {
          angular.copy(res, _this.orders);
          defer.resolve(_this.orders);
        }, function error(err) {
          defer.reject(err);
        });

      return defer.promise;
    };

    this.add = function(order) {
      var defer = $q.defer();

      dpd.orders.post(order)
        .then(function success(res) {
          _this.orders.push(res);
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
