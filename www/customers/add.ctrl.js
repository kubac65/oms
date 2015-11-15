(function(){
  'use strict';

  angular.module('oms.customers')
    .controller('CustomersAddController', addCtrl);

  addCtrl.$inject = ['$scope', '$uibModalInstance', 'CustomersService'];

	function addCtrl($scope, $uibModalInstance, CustomersService){
		$scope.customer = {};

		$scope.add = function(){
			CustomersService.add($scope.customer)
				.then(function success(customer){
					$uibModalInstance.close(customer);
				}, function error(err){
					$uibModalInstance.dismiss();
				});
		};

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    }
	}
})();
