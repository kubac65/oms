(function(){
	var app = angular.module('oms-customers', ['ui.bootstrap']);

	app.controller('CustomersController', function($modal){
		this.customers = customers;

		this.add = function(){
			var customers = this.customers;

			$modal.open({
				templateUrl: 'addUserModal.html',
				controller: function($modalInstance){
					this.customer = {};

					this.add = function(){
						customers.push(this.customer);
						this.customer = {};
						$modalInstance.dismiss('Customer Saved');
					};

					this.cancel = function(){
						$modalInstance.dismiss('Cancel');
					};
				},
				controllerAs: 'addUserCtrl'
			});
		};

		this.remove = function(customer){
			var customers = this.customers;

			$modal.open({
				templateUrl: 'removeUserModal.html',
				controller: function($modalInstance){
					this.customer = customer

					this.yes = function(){
						var index = customers.indexOf(customer);
						customers.splice(index, 1);
						$modalInstance.dismiss('Customer Removed');
					};

					this.no = function(){
						$modalInstance.dismiss('Cancel');
					};
				},
				controllerAs: 'remUserCtrl'
			});
		};

		this.search = function(text){

		};
	});

	var customers = [
		{
			"id": 1,
			"name": "Jakub Potocki",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 2,
			"name": "Agata",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},{
			"id": 3,
			"name": "Guziec",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		},
		{
			"id": 5,
			"name": "Krysia",
			"address": "24 Main Street Cork",
			"contact": "0862548795"
		}
	];
})();