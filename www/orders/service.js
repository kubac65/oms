(function() {
  'use strict';

  angular.module('oms.orders')
    .service('OrdersService', OrdersService);

  OrdersService.$inject = ['$q', 'dpd'];

  function OrdersService($q, dpd){
    this.orders = [];
    this.statuses = [
      {
        value: 'new',
        label: 'New'
      },
      {
        value: 'inprogress',
        label: 'In Progress'
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
        .success(function(res) {
          angular.copy(res, _this.orders);
          defer.resolve(_this.orders);
        })
        .error(function(err) {
          defer.reject(err);
        });

      return defer.promise;
    }

    this.add = function(order) {
      var defer = $q.defer();

      dpd.orders.post(order)
        .success(function(res) {
          _this.orders.push(res);
          defer.resolve(res);
        })
        .error(function(err) {
          defer.reject(err);
        });

      return defer.promise;
    }

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
        .success(function(res) {
          defer.resolve(res);
        })
        .error(function(err) {
          defer.reject(err);
        });

      return defer.promise;
    }

    this.remove = function(order) {
      var defer = $q.defer();

      dpd.orders.del(order.id)
        .success(function(res) {
          var index = _this.orders.indexOf(order);
          _this.orders.splice(index, 1);
          defer.resolve();
        })
        .error(function(err){
          defer.reject(err);
        })

      return defer.promise;
    }
  }
})();
