(function() {
  'use strict';

  angular.module('oms.login')
    .controller('LoginController', loginCtrl);

  loginCtrl.$inject = ['$scope', '$state', 'AuthService'];

  function loginCtrl($scope, $state, AuthService) {
    $scope.user = {
      username: '',
      password: ''
    };

    $scope.login = function(user) {
      AuthService.login(user)
        .then(function(res) {
          $state.transitionTo("customers");
        }, function() {});
    };
  };
})();
