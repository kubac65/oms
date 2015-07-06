(function(){
	var app = angular.module('oms.customers', ['oms.customers.directives', 'ui.bootstrap']);

	app.controller('CustomersListController', customerListCtrl);
	customerListCtrl.$inject = ['$scope', '$modal'];
	function customerListCtrl($scope, $modal){
		$scope.customers = customers;

		$scope.addNew = function(){
			$modal.open({
				templateUrl: 'customers/customer-addnew-modal.template.html',
				size: 'lg',
				controller: addNewCustomerCtrl
			});

			addNewCustomerCtrl.$inject = ['$scope','$modalInstance'];
			function addNewCustomerCtrl($scope, $modalInstance){
				$scope.customer = {};
				$scope.cancel = function(){
					$modalInstance.dismiss();
				};
				$scope.add = function(){
					// Do some black magic with $scope.customer
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

			removeCustomerCtrl.$inject = ['$scope', '$modalInstance'];
			function removeCustomerCtrl($scope, $modalInstance){
				$scope.customer = customer;
			};
		};
	}

	/*app.controller('AddCustomerController', addCustomerCtrl);
	addCustomerCtrl.$inject = ['$scope', '$modalInstance'];
	function addCustomerCtrl($scope,$modalInstance){
		$scope.customer = {};

		$scope.add = function(){

		};
		$scope.cancel = function(){

		};
	}*/

	var customers = [
		{
			"id": 1,
			"name": "Jakub i",
			"address": "24 N Main Street, Cork",
			"phone": "0862548795",
			"email": "test@test.com",
			"jobOrders": [
				{
					"id" : 1,
					"orderDate": "10-08-25",
					"dueDate": "15-35-25",
					"order-ref": "Tomasz",
					"notes": "dupa dupa dupa",
					"total": 1234.12,
					"items": [
						{
							"description": "plexa 10x10",
							"quantity": 2,
							"unitPrice": 10.99,
							"subtotal": 21.89
						},
						{
							"description": "poster",
							"quantity": 20,
							"unitPrice": 1.50,
							"subtotal": 30
						},

					]
				},
				{
					"id" : 2,
					"orderDate": "10-08-25",
					"dueDate": "15-35-25",
					"order-ref": "Tomasz tt",
					"notes": "dupa dupa dupa",
					"total": 12343123.12,
					"items": [
						{
							"description": "plexa 10x10",
							"quantity": 2,
							"unitPrice": 10.99,
							"subtotal": 21.89
						},
						{
							"description": "poster",
							"quantity": 20,
							"unitPrice": 1.50,
							"subtotal": 30
						}
					]
				}
			]
		}
	];
})();
