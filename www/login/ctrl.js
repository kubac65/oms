(function() {
  'use strict';

  angular.module('oms.login')
    .controller('LoginController', loginCtrl);

  loginCtrl.$inject = ['$scope', 'AuthService'];

  function loginCtrl($scope, AuthService) {
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.login = function(user) {
      AuthService.login(user);
    };
  };
})();
