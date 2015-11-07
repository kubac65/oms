(function(){
	var app = angular.module('oms.customers.service', ['dpd']);

	app.service('customersService', customerService);
	customerService.$inject = ['$http', '$q', 'dpd'];

	function customerService($http, $q, dpd){
		var customers = [];

		// customer list from the backend
		this.promise = getAll();
		/*this.promise = dpd.customers.get()
			.success(function(res){
				customers = res;
			});*/

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
			var defer = $q.defer()
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
			dpd.customers.del(customer.id)
				.success(function(res){
					var index = customers.indexOf(customer);
					customers.splice(index, 1);
					delete customer;
				})
				.error(function(err){
					throw(err);
				});
    }

		this.update = function(customer){
			dpd.customers.put(customer.id, {
				name: customer.name,
				address: customer.address,
				email: customer.email,
				phone: customer.phone
			})
				.success(function(res){
					console.log(res);
				})
				.error(function(err){
					throw err;
				});
		}
	}
})();
