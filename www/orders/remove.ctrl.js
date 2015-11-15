(function() {
  'use strict';

  angular.module('oms.orders')
    .controller('RemoveOrderController', removeCtrl);

    removeCtrl.$inject = ['$scope', '$uibModalInstance', 'OrdersService', 'order'];

    function removeCtrl($scope, $uibModalInstance, OrdersService, order) {

      $scope.yes = function() {
        OrdersService.remove(order)
          .then(function success(){
            $uibModalInstance.close();
          }, function error(err) {
            throw err;
          });
      }

      $scope.no = function() {
        $uibModalInstance.dismiss();
      }
    }
})();
