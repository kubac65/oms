(function(){
	'use strict';

	angular.module('oms.customers')
		.controller('CustomersListController', listCtrl);

	listCtrl.$inject = ['$scope', '$uibModal', 'CustomersService', 'NgTableParams'];

	function listCtrl($scope, $uibModal, CustomersService, NgTableParams){
		$scope.vm = {
			customers: []
		};

		AsyncOverlay.On();

		CustomersService.getAll()
			.then(function success(customers){
				$scope.vm.customers = customers;
				$scope.vm.tableParams = new NgTableParams({
					page: 1,
					count: 10
				},
				{
					data: $scope.vm.customers
				});
				AsyncOverlay.Off();
			});
		
		$scope.add = function(){
			var modalInstance = $uibModal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'AddCustomerController',
			});

			modalInstance.result.then(function(addedCustomer){
				$scope.vm.customers.push(addedCustomer);
				$scope.vm.tableParams.reload();
				AsyncOverlay.Off();
			})
		};

		$scope.remove = function(customer){
			var modalInstance = $uibModal.open({
					templateUrl: 'customers/templates/remove-modal.template.html',
					size: 'lg',
					controller: 'RemoveCustomerController',
					resolve: {
							customer: function(){
								return customer;
							}
					}
			});

			modalInstance.result.then(function(removedCustomer){
				var index = $scope.vm.customers.indexOf(removedCustomer);
				$scope.vm.customers.splice(index, 1);
				$scope.vm.tableParams.reload();
				AsyncOverlay.Off();
			});
		};

		$scope.update = function(customer){
			var modalInstance = $uibModal.open({
				templateUrl: 'customers/templates/update-modal.template.html',
				size: 'lg',
				controller: 'CustomerUpdateController',
				resolve: {
						customer: function(){
							return customer;
						}
				}
			});

			modalInstance.result.then(function(updatedCustomer){
				angular.extend(customer, updatedCustomer);
				AsyncOverlay.Off();
			});
		};
	}
})();
