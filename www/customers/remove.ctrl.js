(function(){
  'use strict';

  angular.module('oms.customers')
    .controller('CustomersRemoveController', removeCtrl);

  removeCtrl.$inject = ['$scope', '$modalInstance', 'customersService', 'customer'];
  
	function removeCtrl($scope, $modalInstance, customersService, customer){
		$scope.customer = customer;

		$scope.yes = function(){
      var promise = customersService.remove(customer);
      promise.then(function success(){
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
