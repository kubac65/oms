(function(){
	var app = angular.module('oms.customers.service', []);
  app.service('customersService', function(){
    return {
      customers: _customers,
      add: function(customer){
        // Make request to backend
        this.customers.push(customer);
      },
      remove: function(customer){
        // Make request to backend
        var index = this.customers.indexOf(customer);
				this.customers.splice(index, 1);
      },
			update: function(customer){
				var index = this.customers.indexOf(customer);
			}
    }
  });













  var _customers = [
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
