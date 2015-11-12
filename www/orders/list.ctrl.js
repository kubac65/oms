(function() {
  'use strict';
  angular.module('oms.orders')
    .controller('OrdersListController', listCtrl);

  listCtrl.$inject = ['$scope', '$modal', 'OrdersService'];

  function listCtrl($scope, $modal, OrdersService) {
    $scope.orders = OrdersService.orders;

    $scope.add = function(){
      $modal.open({
				templateUrl: 'orders/templates/addnew-modal.template.html',
				size: 'lg',
				controller:  'CustomersAddController',
			});
    }
  }
})();
