(function(){
  'use strict';

  angular.module('oms.customers')
  	.controller('CustomerUpdateController', updateCtrl);

	updateCtrl.$inject = ['$scope', '$uibModalInstance', 'CustomersService', 'customer'];

	function updateCtrl($scope, $uibModalInstance, CustomersService, customer){
		$scope.customer = {};
		angular.copy(customer, $scope.customer)

		$scope.update = function(){
      AsyncOverlay.On();
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
