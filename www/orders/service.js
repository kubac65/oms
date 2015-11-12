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
  }
})();
