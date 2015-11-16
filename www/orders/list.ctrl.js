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
				controller: 'AddOrderController'
			});
    }

    $scope.edit = function(order) {
      $uibModal.open({
        templateUrl: 'orders/templates/edit-modal.template.html',
        size:'lg',
        controller: 'EditOrderController',
        resolve: {
          order: function() {
            return order;
          }
        }
      });
    }

    $scope.remove = function(order) {
      $uibModal.open({
        templateUrl: 'orders/templates/remove-modal.template.html',
        size:'lg',
        controller: 'RemoveOrderController',
        resolve: {
          order: function() {
            return order;
          }
        }
      });
    }
  }
})();
