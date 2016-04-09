(function(){
	'use strict';

	angular.module('oms.customers')
		.service('CustomersService', customersService);

	customersService.$inject = ['$q'];

	function customersService($q){

		this.getAll =  function(){
			var defer = $q.defer();

			dpd.customers.get()
				.then(function success(res){
					defer.resolve(res);
				}, function error(err){
					defer.reject(err);
				});

			return defer.promise;
		};

		this.add = function(customer){
			var defer = $q.defer();

			dpd.customers.post(customer)
				.then(function success(res){
					defer.resolve(res);
				}, function error(err){
					defer.reject(err);
				});

			return defer.promise;
    };

		this.update = function(customer){
			var defer = $q.defer();

			dpd.customers.put(customer.id, {
				name: customer.name,
				address: customer.address,
				email: customer.email,
				phone: customer.phone
			})
				.then(function success(res){
					defer.resolve(customer);
				}, function error(err){
					defer.reject(err);
				});

			return defer.promise;
		};

		this.remove = function(customer){
			var defer = $q.defer();

			dpd.customers.del(customer.id)
				.then(function success(res){
					defer.resolve();
				}, function error(err){
					defer.reject(err);
				});

			return defer.promise;
    };
	}
})();
