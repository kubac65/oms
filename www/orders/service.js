(function() {
  'use strict';

  angular.module('oms.orders')
    .service('OrdersService', OrdersService);

  OrdersService.$inject = ['$q', 'dpd'];

  function OrdersService($q, dpd){
    this.orders = [];

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
          order.ordId = res.ordId;
          order.status = res.status;
          _this.orders.push(order);
          defer.resolve(order);
        })
        .error(function(err) {
          defer.reject(err);
        });

      return defer.promise;
    }

    this.update = function(order) {
      var defer = $q.defer();

      dpd.orders.put(order.id, {
        custId: order.custId,
        orderDate: order.orderDate,
        dueDate: order.dueDate,
        status: order.status,
        items: order.items,
        ref: order.ref
      })
        .success(function(res) {
          defer.resolve(order);
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
