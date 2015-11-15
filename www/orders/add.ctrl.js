(function(){
  'use strict';

  angular.module('oms.orders')
    .controller('OrderAddController', addOrderCtrl);

  addOrderCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'OrdersService', 'CustomersService'];

  function addOrderCtrl($scope, $uibModal, $uibModalInstance, OrdersService, CustomersService) {
    $scope.customers = CustomersService.customers;
    $scope.order = {
      orderDate: new Date(),
      dueDate: new Date()
    }

    $scope.save = function() {
      $scope.order.custId = $scope.order.customer.custId;
      OrdersService.add($scope.order)
        .then(function success(order) {
          $uibModalInstance.close(order);
        }, function error(err) {
          alert(err);
          throw err;
        });
    }

    $scope.addCustomer = function() {
      $uibModal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'CustomersAddController',
			})
      .result.then(function success(customer) {
        $scope.item.selected = customer;
      });
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }
  }
})();
