(function(){
	var app = angular.module('oms-customers', ['ui.bootstrap']);

	app.controller('CustomersController', customerController);

	customerController.$inject = ['$modal'];

	function customerController($modal){
		this.customers = customers;

		this.add = function(){
			var customers = this.customers;

			$modal.open({
				templateUrl: 'customer-details-modal.html',
				controller: 'CustomerDetailsController',
				controllerAs: 'custDetailsCtrl',
				size: 'lg',
				resolve: {
					customer: function () {
						return {};
					},
					mode: function () {
						return 'addnew';
					}
				}
			});
		};

		this.remove = function(customer){
			var customers = this.customers;

			$modal.open({
				templateUrl: 'customer-remove-modal.html',
				controller: ['$modalInstance', function($modalInstance){
					this.customer = customer
					this.yes = function(){
						var index = customers.indexOf(customer);
						customers.splice(index, 1);
						$modalInstance.dismiss('Customer Removed');
					};

					this.no = function(){
						$modalInstance.dismiss('Cancel');
					};
				}],
				controllerAs: 'remUserCtrl'
			});
		};

		this.show = function(customer){
			var customers = this.customers;

			$modal.open({
				templateUrl: 'customer-details-modal.html',
				controller: 'CustomerDetailsController',
				controllerAs: 'custDetailsCtrl',
				size: 'lg',
				resolve: {
					customer: function () {
						return customer;
					},
					mode: function () {
						return 'update';
					}
				}
			});
		}
	};

	// Need to inject http service for interacting with backend
	app.controller('AddCustomerController', ['$modalInstalance', 'customers', function($modalInstalance, customers){
		this.customers = customers;
		this.add = function(){

		};

		this.dismiss = function(){

		};
	}]);

	// Need to inject http service for interacting with backend
	app.controller('UpdateCustomerController', ['$modalInstance', '$rootScope' 'customer', function($modalInstance, customer){
		this.customer = customer;

		this.update = function(){

		};

		this.dismis = function(){

		};
	}]);

	app.controller('CustomerDetailsController', ['$modalInstance', '$rootScope', 'customer', 'mode', function($modalInstance, $rootScope, customer, mode){
		this.mode = mode;
		this.customer = customer;

		this.update = function(){
			$rootScope.$emit('customerUpdated');
			$modalInstance.dismiss();
		}
		this.add = function(){
			$rootScope.$emit('customerUpdated');
			$modalInstance.dismiss();
		}
		this.dismiss = function(){
			this.customer = {};
			$modalInstance.dismiss();	
		}
	}]);




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
