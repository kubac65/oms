(function(){
  'use strict';

  angular.module('oms.customers')
    .controller('CustomersRemoveController', removeCtrl);

  removeCtrl.$inject = ['$scope', '$modalInstance', 'CustomersService', 'customer'];

	function removeCtrl($scope, $modalInstance, CustomersService, customer){
		$scope.customer = customer;

		$scope.yes = function(){
      CustomersService.remove(customer)
        .then(function success(){
          $modalInstance.close();
        }, function error(err){
          throw err;
        });
		};

		$scope.no = function(){
			$modalInstance.dismiss();
		};
	}
})();
