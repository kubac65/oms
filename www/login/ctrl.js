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

    $scope.loading = false;
    $scope.error = false;

    $scope.login = function(user) {
      AuthService.login(user)
        .then(function success(res) {
          $scope.loading = true;
          $state.transitionTo('customers');
          $scope.error = false;
        }, function error(err) {
          $scope.error = true;
        });
    };
  };
})();
