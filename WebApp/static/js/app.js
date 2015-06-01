(function(){
	var app = angular.module('oms', []);

	app.controller('CustomersController', function(){
		this.customers = customers;
		this.remove = function(customer){
			var index = this.customers.indexOf(customer);
			this.customers.splice(index, 1);
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
		}
	];
})();
