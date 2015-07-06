(function(){
	var app = angular.module('oms.customers', ['oms.customers.directives', 'oms.customers.service', 'ui.bootstrap']);

	app.controller('CustomersListController', customerListCtrl);

	customerListCtrl.$inject = ['$scope', '$modal', 'customersService'];
	function customerListCtrl($scope, $modal, customersService){
		$scope.customers = customersService.customers;

		$scope.add = function(){
			$modal.open({
				templateUrl: 'customers/customer-addnew-modal.template.html',
				size: 'lg',
				controller: addNewCustomerCtrl
			});

			addNewCustomerCtrl.$inject = ['$scope', '$modalInstance', 'customersService'];
			function addNewCustomerCtrl($scope, $modalInstance, customersService){
				$scope.customer = {};

				$scope.add = function(){
					customersService.add($scope.customer);
					$modalInstance.dismiss();
				};

				$scope.cancel = function(){
					$modalInstance.dismiss();
				};
			}
		};

		$scope.remove = function(customer){
			$modal.open({
					templateUrl: 'customers/customer-remove-modal.template.html',
					size: 'lg',
					controller: removeCustomerCtrl
			});

			removeCustomerCtrl.$inject = ['$scope', '$modalInstance', 'customersService'];
			function removeCustomerCtrl($scope, $modalInstance, customersService){
				$scope.customer = customer;

				$scope.yes = function(){
					customersService.remove($scope.customer);
					$modalInstance.dismiss();
				};

				$scope.no = function(){
					$modalInstance.dismiss();
				};
			};
		};
	}
})();
