(function(){
	'use strict';

	angular.module('oms.customers')
		.service('CustomersService', CustomersService);

	CustomersService.$inject = ['$http', '$q', 'dpd'];

	function CustomersService($http, $q, dpd){
		this.customers = [];
		
		var _this = this;

		this.getAll =  function(){
			var defer = $q.defer();
			var promise = dpd.customers.get();

			promise.success(function(res){
				angular.copy(res, _this.customers)
				defer.resolve(_this.customers);
			})
			.error(function(err){
				defer.reject(err);
			});

			return defer.promise;
		}

		this.search = function(phrase){
				dpd.customers.get({$or: [{name: phrase}, {custId: phrase}]})
					.success(function(res){
						angular.copy(res,_this.customers);
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
				_this.customers.push(customer);
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
				var index = _this.customers.indexOf(customer);
				_this.customers.splice(index, 1);
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
