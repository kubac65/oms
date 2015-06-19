(function(){
	var app = angular.module('oms-customers', ['ui.bootstrap']);

	app.controller('CustomersController', ['$modal',function($modal){
		this.customers = customers;

		this.add = function(){
			var customers = this.customers;

			$modal.open({
				templateUrl: 'customer-details-modal.html',
				controller: 'CustomerDetailsController',
				controllerAs: 'custDetailsCtrl',
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
	}]);

	app.controller('CustomerDetailsController', ['$modalInstance', '$rootScope', 'customer', 'mode', function($modalInstance, $rootScope, customer, mode){
		this.mode = mode;
		this.customer = customer;

		this.update = function(){
			$rootScope.$emit('customerUpdated');
			$modalInstance.dismiss();
		}
		this.add = function(){

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
			"job-orders": [
				{
					"job-number" : 1,
					"order-date": "10-08-25",
					"due-date": "15-35-25",
					"notes": "dupa dupa dupa"
				}
			]
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"phone": "0862548795",
			"email": "test@test.com"
		}
	];
})();
