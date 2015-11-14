(function(){
  'use strict';

  angular.module('oms.customers')
  	.controller('CustomersDetailsController', detailsCtrl);

	detailsCtrl.$inject = ['$scope', '$uibModalInstance', 'CustomersService', 'customer'];

	function detailsCtrl($scope, $uibModalInstance, CustomersService, customer){
		$scope.customer = {};
		angular.copy(customer, $scope.customer)

		$scope.update = function(){
			CustomersService.update($scope.customer)
        .then(function success(){
          $uibModalInstance.close($scope.customer);
        }, function error(err){
          throw err;
        });
		};

		$scope.cancel = function(){
			$uibModalInstance.dismiss();
		};
	}
})();
