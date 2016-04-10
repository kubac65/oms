var scope;
(function() {
  'use strict';

  angular.module('oms.orders')
    .controller('EditOrderController', editOrderCtrl);

  editOrderCtrl.$inject = ['$scope', '$uibModal', '$uibModalInstance', 'OrdersService', 'CustomersService', 'order'];

  function editOrderCtrl($scope, $uibModal, $uibModalInstance, OrdersService, CustomersService, order) {
    AsyncOverlay.On();
    scope = $scope;
    $scope.vm = {
      customers: [],
      statuses: OrdersService.statuses,
      order: {},
      vatOptions: [
        {
          value: 0,
          label: 'No VAT'
        },
        {
          value: 0.23,
          label: '23%'
        }
      ],
      error: false,
      addingNewItem: false,
      newItem: {}
    };

    CustomersService.getAll()
      .then(function(customers){
        $scope.vm.customers = customers;

        if(order.id) {
          $scope.vm.order = order;
          $scope.vm.order.orderDate = new Date(order.orderDate);
          $scope.vm.order.dueDate = new Date(order.dueDate);

          for (var i = 0; i < $scope.vm.customers.length; i++) {
            if ($scope.vm.customers[i].id == $scope.vm.order.customer.id) {
              $scope.vm.selected = {
                customer: $scope.vm.customers[i]
              }
              break;
            }
          }

          for (var i = 0; i< $scope.vm.vatOptions.length; i++) {
            if($scope.vm.vatOptions[i].value == $scope.vm.order.vatOption) {
              $scope.vm.selected.vatOption = $scope.vm.vatOptions[i];
              break;
            }
          }
        }
        else {
          $scope.vm.order = {
            customer: {},
            orderDate: new Date(),
            dueDate: new Date(),
            status: $scope.vm.statuses[0].id,
            items: [],
            total: 0,
            vat: 0,
            totalDue: 0
          }

          $scope.vm.selected = {
            customer: null,
            vatOption: $scope.vm.vatOptions[0]
          }
        }

        AsyncOverlay.Off();
      });

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
      $scope.vm.order.items.forEach(function(item) {
        total += item.quantity * item.unitPrice;
      });
      $scope.vm.order.total = total;
      $scope.vm.order.vat = total * $scope.vm.selected.vatOption.value;
      $scope.vm.order.totalDue = $scope.vm.order.total + $scope.vm.order.vat
    }

    this.save = function() {
      $scope.vm.order.customer.id = $scope.vm.selected.customer.id;
      $scope.vm.order.customer.name = $scope.vm.selected.customer.name;
      $scope.vm.order.vatOption = $scope.vm.selected.vatOption.value;

      if($scope.vm.order.id) {
        $uibModalInstance.result.then(function(updatedOrder){
          angular.extend(order, updatedOrder);
        });

        OrdersService.update($scope.vm.order)
          .then(function success(updatedOrder) {
            $uibModalInstance.close(updatedOrder);
          }, function error(err) {
            $scope.error = true;
            throw err;
          });
      }
      else {
        OrdersService.add($scope.vm.order)
          .then(function success(addedOrder) {
            $uibModalInstance.close(addedOrder);
          }, function error(err) {
            $scope.error = true;
            throw err;
          });
      }
    }

    this.updateVat = function() {
      updateTotal();
    }

    this.addCustomer = function() {
      var modalInstance = $uibModal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'AddCustomerController',
			});

      modalInstance.result.then(function(addedCustomer){
        $scope.vm.customers.push(addedCustomer);
        $scope.selected = {
          customer: addedCustomer
        };

        AsyncOverlay.Off();
      });
    }

    this.addItem = function() {
      $scope.vm.addingNewItem = true;
    }

    this.saveItem = function() {
      $scope.vm.order.items.push(angular.copy($scope.vm.newItem));
      $scope.vm.newItem = {}
      $scope.$emit('updateTotal');
      $scope.vm.addingNewItem = false;
    }

    this.cancelItem = function() {
      $scope.vm.newItem = {}
      $scope.vm.addingNewItem = false;
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
