(function(){
	'use strict';

	angular.module('oms.customers')
		.service('customersService', customerService);

	customerService.$inject = ['$http', '$q', 'dpd'];

	function customerService($http, $q, dpd){
		var customers = [];

		// customer list from the backend
		this.promise = getAll();

		function getAll(){
			return dpd.customers.get()
				.success(function(res){
					//angular.copy(res, customers)
					customers = res;
				})
				.error(function(err){
					throw err;
				});
		}
		this.getAll = function(){
			return customers;
		};

		this.search = function(phrase){
				dpd.customers.get({$or: [{name: phrase}, {custId: phrase}]})
					.success(function(res){
						angular.copy(res,customers);
					})
					.error(function(err){
						throw err;
					})
		}

		this.add = function(customer){
			var defer = $q.defer();
			var promise = dpd.customers.post(customer);

			promise.success(function(res){
				customer.custId=res.custId;
				customers.push(customer);
				defer.resolve(customer);
			})
			.error(function(err){
				defer.reject(err);
			});

			return defer.promise;
    }

		this.remove = function(customer){
			var defer = $q.defer();
			var promise = dpd.customers.del(customer.id);

			promise.success(function(res){
				var index = customers.indexOf(customer);
				customers.splice(index, 1);
				defer.resolve();
			})
			.error(function(err){
				defer.reject(err);
			});

			return defer.promise;
    }

		this.update = function(customer){
			var defer = $q.defer();
			var promise = dpd.customers.put(customer.id, {
				name: customer.name,
				address: customer.address,
				email: customer.email,
				phone: customer.phone
			});

			promise.success(function(res){
				defer.resolve(customer);
			})
			.error(function(err){
				defer.reject(err);
			});

			return defer.promise;
		}
	}
})();
