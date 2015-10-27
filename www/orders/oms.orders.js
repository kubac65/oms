(function(){
  var app = angular.module('oms.orders', ['oms.orders.service', 'ui.bootstrap']);

  app.controller('OrdersListController', listCtrl);
  listCtrl.$inject = ['$scope', '$modal', 'ordersService'];

  function listCtrl($scope, $modal, ordersService){
    $scope.orders = ordersService.orders;
  }
})();
