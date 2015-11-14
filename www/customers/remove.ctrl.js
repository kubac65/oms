(function(){
  'use strict';

  angular.module('oms.customers')
    .controller('CustomersRemoveController', removeCtrl);

  removeCtrl.$inject = ['$scope', '$uibModalInstance', 'CustomersService', 'customer'];

	function removeCtrl($scope, $uibModalInstance, CustomersService, customer){
		$scope.customer = customer;

		$scope.yes = function(){
      CustomersService.remove(customer)
        .then(function success(){
          $uibModalInstance.close();
        }, function error(err){
          throw err;
        });
		};

		$scope.no = function(){
			$uibModalInstance.dismiss();
		};
	}
})();
