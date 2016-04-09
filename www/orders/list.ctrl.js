(function() {
  'use strict';
  angular.module('oms.orders')
    .controller('OrdersListController', listCtrl);

  listCtrl.$inject = ['$scope', '$q', '$uibModal', 'OrdersService', 'CustomersService', 'NgTableParams'];

  function listCtrl($scope, $q, $uibModal, OrdersService, CustomersService, NgTableParams) {
    AsyncOverlay.On();

    $scope.vm = {
      orders: [],
      statuses: OrdersService.statuses
    };

    OrdersService.getAll()
      .then(function(orders){
        $scope.vm.orders = orders;
        $scope.vm.tableParams = new NgTableParams({
          page: 1,
          count: 10,
          sorting: {ordId: 'asc'}
        },{
          dataset: $scope.vm.orders
        });

        AsyncOverlay.Off();
      });

    $scope.add = function(){
      var modalInstance = $uibModal.open({
				templateUrl: 'orders/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'EditOrderController as eoCtrl',
        resolve: {
          order: function() {
            return {};
          }
        }
			});

      modalInstance.result.then(function(addedOrder){
        $scope.vm.orders.push(addedOrder);
        $scope.vm.tableParams.reload();
        AsyncOverlay.Off();
      });
    }

    $scope.edit = function(order) {
      $uibModal.open({
        templateUrl: 'orders/templates/edit-modal.template.html',
        size:'lg',
        controller: 'EditOrderController as eoCtrl',
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
