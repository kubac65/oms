(function(){
	'use strict';

	angular.module('oms.customers')
		.service('CustomersService', CustomersService);

	CustomersService.$inject = ['$q', 'dpd'];

	function CustomersService($q, dpd){
		this.customers = [];

		var _this = this;

		this.getAll =  function(){
			var defer = $q.defer();

			dpd.customers.get()
				.success(function(res){
					angular.copy(res, _this.customers)
					defer.resolve(_this.customers);
				})
				.error(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}

		this.add = function(customer){
			var defer = $q.defer();

			dpd.customers.post(customer)
				.success(function(res){
					customer.custId=res.custId;
					_this.customers.push(customer);
					defer.resolve(customer);
				})
				.error(function(err){
					defer.reject(err);
				});

			return defer.promise;
    }

		this.update = function(customer){
			var defer = $q.defer();

			dpd.customers.put(customer.id, {
				name: customer.name,
				address: customer.address,
				email: customer.email,
				phone: customer.phone
			})
				.success(function(res){
					defer.resolve(customer);
				})
				.error(function(err){
					defer.reject(err);
				});

			return defer.promise;
		}

		this.remove = function(customer){
			var defer = $q.defer();

			dpd.customers.del(customer.id)
				.success(function(res){
					var index = _this.customers.indexOf(customer);
					_this.customers.splice(index, 1);
					defer.resolve();
				})
				.error(function(err){
					defer.reject(err);
				});

			return defer.promise;
    }
	}
})();
