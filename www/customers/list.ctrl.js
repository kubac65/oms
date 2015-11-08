(function(){
	'use strict';
	
	angular.module('oms.customers')
		.controller('CustomersListController', listCtrl);

	listCtrl.$inject = ['$scope', '$modal', 'customersService'];

	function listCtrl($scope, $modal, customersService){
		//$scope.customers = customersService.customers;
		$scope.customers = customersService.getAll();

		$scope.add = function(){
			var modalInstance = $modal.open({
				templateUrl: 'customers/templates/addnew-modal.template.html',
				size: 'lg',
				controller: 'CustomersAddController',
			});
		};

		$scope.remove = function(customer){
			var modalInstance = $modal.open({
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

		$scope.details = function(customer){
			var modalInstance = $modal.open({
				templateUrl: 'customers/templates/details-modal.template.html',
				size: 'lg',
				controller: 'CustomersDetailsController',
				resolve: {
						customer: function(){
							return customer;
						}
				}
			});

			modalInstance.result.then(function(updatedCustomer){
				angular.extend(customer, updatedCustomer);
			});
		};

		$scope.search = function(phrase){
			customersService.search(phrase);
		};
	}
})();
