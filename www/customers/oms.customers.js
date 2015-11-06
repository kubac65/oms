(function(){
	var app = angular.module('oms.customers', ['oms.customers.directives', 'oms.customers.service', 'ui.bootstrap']);

	app.controller('CustomersListController', listCtrl);
	listCtrl.$inject = ['$scope', '$modal', 'customersService'];

	function listCtrl($scope, $modal, customersService){
		//$scope.customers = customersService.customers;
		$scope.customers = customersService.getAll();

		$scope.add = function(){
			var modalInstance = $modal.open({
				templateUrl: 'customers/customer-addnew-modal.template.html',
				size: 'lg',
				controller: 'CustomersAddController',
			});

			modalInstance.result.then(function(newCustomer){
				customersService.add(newCustomer);
			});
		};

		$scope.remove = function(customer){
			var modalInstance = $modal.open({
					templateUrl: 'customers/customer-remove-modal.template.html',
					size: 'lg',
					controller: 'CustomersRemoveController',
					resolve: {
							customer: function(){
								return customer;
							}
					}
			});

			modalInstance.result.then(function(customer){
				customersService.remove(customer);
			});
		};

		$scope.details = function(customer){
			var modalInstance = $modal.open({
				templateUrl: 'customers/customer-details-modal.template.html',
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

	app.controller('CustomersAddController', addCtrl);
	addCtrl.$inject = ['$scope', '$modalInstance',];

	function addCtrl($scope, $modalInstance){
		$scope.customer = {};

		$scope.add = function(){
			$modalInstance.close($scope.customer);
		};

		$scope.cancel = function(){
			$modalInstance.dismiss();
		};
	}

	app.controller('CustomersRemoveController', removeCtrl);
	removeCtrl.$inject = ['$scope', '$modalInstance', 'customer'];

	function removeCtrl($scope, $modalInstance, customer){
		$scope.customer = customer;

		$scope.yes = function(){
			$modalInstance.close($scope.customer);
		};

		$scope.no = function(){
			$modalInstance.dismiss();
		};
	}

	app.controller('CustomersDetailsController', detailsCtrl);
	detailsCtrl.$inject = ['$scope', '$modalInstance', 'customer', 'customersService'];

	function detailsCtrl($scope, $modalInstance, customer, customerService){
		$scope.customer = {};
		angular.copy(customer, $scope.customer)

		$scope.update = function(){
			customerService.update($scope.customer);
			$modalInstance.close($scope.customer);
		};

		$scope.cancel = function(){
			$modalInstance.dismiss();
		};
	}
})();
