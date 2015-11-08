(function(){
  'use strict';
  angular.module('oms.customers')
    .controller('CustomersAddController', addCtrl);

  addCtrl.$inject = ['$scope', '$modalInstance', 'customersService'];

	function addCtrl($scope, $modalInstance, customersService){
		$scope.customer = {};

		$scope.add = function(){
			var promise = customersService.add($scope.customer);
				promise.then(function success(customer){
					$modalInstance.close(customer);
				}, function error(err){
					$modalInstance.dismiss();
				});
		};

		$scope.cancel = function(){
      $modalInstance.dismiss();
		};
	}
})();
