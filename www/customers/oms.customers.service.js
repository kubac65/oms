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
				console.log(res.data);
				customers.push(customer);
			}, function(res){
				alert('Error2');
			});


      // Make request to backend

    }

		this.remove = function(customer){
      // Make request to backend
      var index = customers.indexOf(customer);
			customers.splice(index, 1);
    }

		this.update = function(customer){
			var index = customers.indexOf(customer);
		}
	}
})();
