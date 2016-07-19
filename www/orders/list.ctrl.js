(function() {
  'use strict';
  angular.module('oms.orders')
    .controller('OrdersListController', listCtrl);

  listCtrl.$inject = ['$scope', '$q', '$uibModal', 'OrdersService', 'CustomersService', 'NgTableParams'];

  function listCtrl($scope, $q, $uibModal, OrdersService, CustomersService, NgTableParams) {
    AsyncOverlay.On();

    $scope.vm = {
      orders: [],
      statuses: OrdersService.statuses,
      dataSets: OrdersService.datasets
    };
    $scope.vm.selectedSet = $scope.vm.dataSets[0];

    datasetChanged();

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
      var modalInstance = $uibModal.open({
        templateUrl: 'orders/templates/remove-modal.template.html',
        size:'lg',
        controller: 'RemoveOrderController',
        resolve: {
          order: function() {
            return order;
          }
        }
      });

      modalInstance.result.then(function(){
        var index = $scope.vm.orders.indexOf(order);
        $scope.vm.orders.splice(index, 1);
        $scope.vm.tableParams.reload();
      });
    }

    $scope.archive = function(order) {
      var modalInstance = $uibModal.open({
        templateUrl: 'orders/templates/archive-modal.template.html',
        size:'lg',
        controller: 'ArchiveOrderController',
        resolve: {
          order: function() {
            return order;
          }
        }
      });

      modalInstance.result.then(function(){
        var index = $scope.vm.orders.indexOf(order);
        $scope.vm.orders.splice(index, 1);
        $scope.vm.tableParams.reload();
      });
    }

    $scope.datasetChanged = datasetChanged;

    function datasetChanged(){
      OrdersService.getAll($scope.vm.selectedSet)
        .then(function(orders){
          $scope.vm.orders = orders;
          $scope.vm.tableParams = new NgTableParams({
            page: 1,
            count: 10,
            sorting: {ordId: 'desc'}
          },{
            dataset: $scope.vm.orders
          });
          $scope.vm.tableParams.reload();

          AsyncOverlay.Off();
        });
    }
  }
})();
