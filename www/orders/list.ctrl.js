(function() {
  'use strict';
  angular.module('oms.orders')
    .controller('OrdersListController', listCtrl);

  listCtrl.$inject = ['$scope', '$uibModal', 'OrdersService'];

  function listCtrl($scope, $uibModal, OrdersService) {
    $scope.orders = OrdersService.orders;

    $scope.add = function(){
      $uibModal.open({
				templateUrl: 'orders/templates/addnew-modal.template.html',
				size: 'lg',
				controller:  'OrderAddController',
			});
    }
  }
})();
