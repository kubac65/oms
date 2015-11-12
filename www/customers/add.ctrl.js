(function(){
  'use strict';

  angular.module('oms.customers')
    .controller('CustomersAddController', addCtrl);

  addCtrl.$inject = ['$scope', '$modalInstance', 'CustomersService'];

	function addCtrl($scope, $modalInstance, CustomersService){
		$scope.customer = {};

		$scope.add = function(){
			CustomersService.add($scope.customer)
				.then(function success(customer){
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
