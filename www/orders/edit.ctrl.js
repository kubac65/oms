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
    $scope.newItem = {};

    $scope.order = {};
    angular.copy(order, $scope.order);

    if($scope.order.id) {
      $scope.order.orderDate = new Date(order.orderDate);
      $scope.order.dueDate = new Date(order.dueDate);

      for (var i = 0; i < $scope.customers.length; i++) {
        if ($scope.customers[i].id == $scope.order.customer.id) {
          $scope.selected = {
            customer: $scope.customers[i]
          }
          break;
        }
      }
    }
    else {
      $scope.order = {
        customer: {},
        orderDate: new Date(),
        dueDate: new Date(),
        status: $scope.statuses[0].value,
        items: [],
        total: 0
      }

      $scope.selected = {
        customer: null
      }
    }
    $scope.$on('updateTotal', function() {
      updateTotal();
    });

    $scope.$on('removeItem', function(event, item) {
        var index = $scope.order.items.indexOf(item);
        $scope.order.items.splice(index, 1);
        updateTotal();
    });

    var updateTotal = function() {
      var total = 0;
      $scope.order.items.forEach(function(item) {
        total += item.quantity * item.unitPrice;
      });
      $scope.order.total = total;
    }

    this.save = function() {
      $scope.order.customer.id = $scope.selected.customer.id;
      $scope.order.customer.name = $scope.selected.customer.name;

      if($scope.order.id) {
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
      else {
        OrdersService.add($scope.order)
          .then(function success(order) {
            $uibModalInstance.close(order);
          }, function error(err) {
            $scope.error = true;
            throw err;
          });
      }
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

    this.saveItem = function() {
      $scope.order.items.push(angular.copy($scope.newItem));
      $scope.newItem = {}
      $scope.$emit('updateTotal');
      $scope.addingNewItem = false;
    }

    this.cancelItem = function() {
      $scope.newItem = {}
      $scope.addingNewItem = false;
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
