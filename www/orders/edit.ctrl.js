(function() {
  'use strict';

  angular.module('oms.orders')
    .controller('EditOrderController', editOrderCtrl);

  editOrderCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'OrdersService', 'CustomersService', 'order'];

  function editOrderCtrl($scope, $uibModal, $uibModalInstance, OrdersService, CustomersService, order) {
    $scope.customers = CustomersService.customers;
    $scope.statuses = OrdersService.statuses;
    $scope.error = false;
    $scope.addingNewItem = false;


    $scope.order = {};
    angular.copy(order, $scope.order);
    $scope.order.orderDate = new Date(order.orderDate);
    $scope.order.dueDate = new Date(order.dueDate);

    $scope.$on('updateTotal', function() {
      var total = 0;
      $scope.order.items.forEach(function(item) {
        total += item.quantity * item.unitPrice;
      });
      $scope.order.total = total;
    });

    $scope.$on('removeItem', function(event, item) {
        var index = $scope.order.items.indexOf(item);
        $scope.order.items.splice(index, 1);
    });

    //Find selected customer
    for (var i = 0; i < $scope.customers.length; i++) {
      if ($scope.customers[i].id == $scope.order.customer.id) {
        $scope.selected = {
          customer: $scope.customers[i]
        }
        break;
      }
    }


    this.save = function() {
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

    this.addCustomer = function() {
      $uibModal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'AddCustomerController',
			});
    }

    this.addItem = function() {
      $scope.addingNewItem = true;
    }

    this.cancel = function() {
      $uibModalInstance.dismiss();
    }
  }

  angular.module('oms.orders')
    .controller('OrderItemController', orderItemCtlr);

  orderItemCtlr.$inject = ['$scope'];

  function orderItemCtlr($scope) {
    $scope.editing = false;
    $scope.editedItem = {};

    this.edit = function() {
      angular.copy($scope.item, $scope.editedItem);
      $scope.editing = true;
    }

    this.save = function() {
      angular.extend($scope.item, $scope.editedItem);
      $scope.$emit('updateTotal');
      $scope.editing = false;
    }

    this.remove = function() {
      $scope.$emit('removeItem', $scope.item);
    }

    this.cancel = function() {
      $scope.editedItem = {};
      $scope.editing = false;
    }
  }
})();
