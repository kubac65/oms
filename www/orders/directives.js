(function(){
  'use strict';

  angular.module('oms.orders')
    .directive('orderDetails', function() {
      return {
        restrict: 'E',
        transclude: true,
        replace: true,
        templateUrl: 'orders/templates/details-directive.template.html'
      }
    });

  angular.module('oms.orders')
    .directive('orderItem', function() {
      return {
        restrict: 'AE',
        transclude: true,
        replace: true,
        templateUrl: 'orders/templates/orderitem-directive.template.html',
        require: '^orderDetails',
        controller: 'OrderItemController as oilCtrl',
        scope: {
          item: '='
        }
      }
    });
})();
