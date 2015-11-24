(function() {
  'use strict';

  angular.module('oms.login')
    .controller('LoginController', loginCtrl);

  loginCtrl.$inject = ['$scope', 'LoginService'];

  function loginCtrl($scope, LoginService) {
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.login = function(user) {
      LoginService.login(user);
    };
  };
})();
