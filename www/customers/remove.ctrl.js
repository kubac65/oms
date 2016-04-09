(function(){
  'use strict';

  angular.module('oms.customers')
    .controller('RemoveCustomerController', removeCtrl);

  removeCtrl.$inject = ['$scope', '$uibModalInstance', 'CustomersService', 'customer'];

	function removeCtrl($scope, $uibModalInstance, CustomersService, customer){
		$scope.customer = customer;

		$scope.yes = function(){
      AsyncOverlay.On();
      CustomersService.remove(customer)
        .then(function success(){
          $uibModalInstance.close(customer);
        }, function error(err){
          throw err;
        });
		};

		$scope.no = function(){
			$uibModalInstance.dismiss();
		};
	}
})();
