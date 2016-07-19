(function() {
  'use strict';

  angular.module('oms.orders')
    .controller('ArchiveOrderController', removeCtrl);

    removeCtrl.$inject = ['$scope', '$uibModalInstance', 'OrdersService', 'order'];

    function removeCtrl($scope, $uibModalInstance, OrdersService, order) {

      $scope.yes = function() {
        OrdersService.archive(order)
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
