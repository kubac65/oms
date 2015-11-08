(function(){
  'use strict';
  
  angular.module('oms.customers')
  	.controller('CustomersDetailsController', detailsCtrl);

	detailsCtrl.$inject = ['$scope', '$modalInstance', 'customersService', 'customer'];

	function detailsCtrl($scope, $modalInstance, customerService, customer){
		$scope.customer = {};
		angular.copy(customer, $scope.customer)

		$scope.update = function(){
			var promise = customerService.update($scope.customer);
      promise.then(function success(){
        $modalInstance.close($scope.customer);
      }, function error(err){
        throw err;
      });
		};

		$scope.cancel = function(){
			$modalInstance.dismiss();
		};
	}
})();
