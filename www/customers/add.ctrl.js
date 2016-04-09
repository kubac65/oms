(function(){
  'use strict';

  angular.module('oms.customers')
    .controller('AddCustomerController', addCtrl);

  addCtrl.$inject = ['$scope', '$uibModalInstance', 'CustomersService'];

	function addCtrl($scope, $uibModalInstance, CustomersService){
		$scope.customer = {};
    $scope.error = false;


		$scope.add = function(){
      AsyncOverlay.On();
			CustomersService.add($scope.customer)
				.then(function success(customer){
					$uibModalInstance.close(customer);
				}, function error(err){
					$scope.error = true;
          throw err;
				});
		};

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }
	}
})();
