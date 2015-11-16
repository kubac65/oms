(function(){
  'use strict';

  angular.module('oms.orders')
    .directive('orderDetails', function(){
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'orders/templates/details-directive.template.html'
      };
    });
})();
