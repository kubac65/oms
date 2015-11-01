(function(){
	var app = angular.module('oms.customers.service', []);

	app.service('customersService', customerService);
	customerService.$inject = ['$http'];

	function customerService($http){
		var customers = [];

		// customer list from the backend
		this.promise = $http({
				method:'GET',
				url: '/api/customers'
			}).then(function(res){
				console.log(res);
				customers = res.data;
			}, function(res){
				alert('Error1');
			});

		this.getAll = function(){
			return customers;
		}
		this.add = function(customer){
			$http({
				method:'PUT',
				url: '/api/customers',
				data: JSON.stringify(customer)
			}).then(function(res){
				// Update customer id with newly generated one
				customer._id=res.data._id;
				customers.push(customer);
			}, function(res){
				alert('Couldn\'t add new customer.');
			});


      // Make request to backend

    }

		this.remove = function(customer){
      // Make request to backend
			$http({
				method: 'DELETE',
				url: '/api/customers/' + customer._id
			}).then(function success(res){
				// Remove customer from the array
				var index = customers.indexOf(customer);
				customers.splice(index, 1);
				delete customer;
			}, function fail(res){
				alert('Failed');
			});
    }

		this.update = function(customer){
			var index = customers.indexOf(customer);
		}
	}
})();
