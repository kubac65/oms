(function() {
  'use strict';

  angular.module('oms.orders')
    .controller('EditOrderController', editOrderCtrl);

  editOrderCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'OrdersService', 'CustomersService', 'order'];

  function editOrderCtrl($scope, $uibModal, $uibModalInstance, OrdersService, CustomersService, order) {
    $scope.customers = CustomersService.customers;
    $scope.statuses = OrdersService.statuses;
    $scope.error = false;

    $scope.order = {};
    angular.copy(order, $scope.order);

    $scope.order.orderDate = new Date(order.orderDate);
    $scope.order.dueDate = new Date(order.dueDate);

    //Find selected
    for (var i = 0; i < $scope.customers.length; i++) {
      if ($scope.customers[i].id == $scope.order.customer.id) {
        $scope.selected = {
          customer: $scope.customers[i]
        }
        break;
      }
    }

    $scope.newListItem = {};

    $scope.save = function() {
      $scope.order.customer.id = $scope.selected.customer.id;
      $scope.order.customer.name = $scope.selected.customer.name;

      $uibModalInstance.result.then(function(updatedOrder){
        angular.extend(order, updatedOrder);
      });

      OrdersService.update($scope.order)
        .then(function success() {
          $uibModalInstance.close($scope.order);
        }, function error(err) {
          $scope.error = true;
          throw err;
        });
    }

    $scope.addCustomer = function() {
      $uibModal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'AddCustomerController',
			});
    }

    $scope.addItem = function(newListItem) {
      $scope.order.items.push(newListItem);
      $scope.order.total += newListItem.quantity * newListItem.unitPrice;
      $scope.newListItem = {};
    }

    $scope.clearItem = function() {
      $scope.newListItem = {};
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }
  }
})();
