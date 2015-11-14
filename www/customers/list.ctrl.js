(function(){
	'use strict';

	angular.module('oms.customers')
		.controller('CustomersListController', listCtrl);

	listCtrl.$inject = ['$scope', '$uibModal', 'CustomersService'];

	function listCtrl($scope, $uibModal, CustomersService){
		$scope.customers = CustomersService.customers;

		$scope.add = function(){
			$uibModal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'CustomersAddController',
			});
		};

		$scope.remove = function(customer){
			$uibModal.open({
					templateUrl: 'customers/templates/remove-modal.template.html',
					size: 'lg',
					controller: 'CustomersRemoveController',
					resolve: {
							customer: function(){
								return customer;
							}
					}
			});
		};

		$scope.update = function(customer){
			var uibModalInstance = $uibModal.open({
				templateUrl: 'customers/templates/update-modal.template.html',
				size: 'lg',
				controller: 'CustomerUpdateController',
				resolve: {
						customer: function(){
							return customer;
						}
				}
			});

			uibModalInstance.result.then(function(updatedCustomer){
				angular.extend(customer, updatedCustomer);
			});
		};

		$scope.search = function(phrase){
			CustomersService.search(phrase);
		};
	}
})();
