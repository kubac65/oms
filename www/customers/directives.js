(function(){
  'use strict';

  angular.module('oms.customers.directives', [])
    .directive('customerDetails', function(){
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'customers/templates/details-directive.template.html'
      };
    });
})();
