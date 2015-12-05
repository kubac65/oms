(function(){
  'use strict';

  angular.module('oms')
    .controller('NavbarController', navbarCtrl);

  navbarCtrl.$inject = ['$scope', '$state', 'AuthService'];

  function navbarCtrl($scope, $state, AuthService) {
    this.user = AuthService.auth.user;

    this.isAuthenticated = function() {
      return AuthService.isAuthenticated();
    };

    this.logout = function() {
      AuthService.logout()
        .then(function success(res) {
          $state.transitionTo('login');
        }, function error(err) {
          throw err;
        });
    };
  };
})();