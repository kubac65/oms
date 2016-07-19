(function(){
  'use strict';

  angular.module('oms')
    .controller('NavbarController', navbarCtrl);

  navbarCtrl.$inject = ['$scope', '$state', 'AuthService', '$q'];

  function navbarCtrl($scope, $state, AuthService, $q) {
    $scope.authenticated = false;

    authentictionChanged();

    $scope.$on('authentiction-changed', function(){
      authentictionChanged();
    });

    this.logout = function() {
      AuthService.logout()
        .then(function success(res) {
          $state.transitionTo('login');
        }, function error(err) {
          throw err;
        });
    };

    function authentictionChanged(){
      AuthService.isAuthenticated().then(function(authenticated){
          $scope.authenticated = authenticated;
      }, function() {
        $scope.authenticated = false;
      });
    }
  };
})();
