(function(){
  'use strict';

  angular.module('oms.customers')
  	.controller('CustomersDetailsController', detailsCtrl);

	detailsCtrl.$inject = ['$scope', '$modalInstance', 'CustomersService', 'customer'];

	function detailsCtrl($scope, $modalInstance, CustomersService, customer){
		$scope.customer = {};
		angular.copy(customer, $scope.customer)

		$scope.update = function(){
			CustomersService.update($scope.customer)
        .then(function success(){
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
