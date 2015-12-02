(function() {
  'use strict';

  angular.module('oms.login')
    .service('AuthService', authService);

  authService.$inject = [];

  function authService() {
    var authenticated = false;

    this.login = function(user) {
      dpd.users.login(user)
        .then(function success(result){
          authenticated = true;
        }, function err(err){
          throw err;
        });
    };

    this.logout = function() {
      dpd.users.get('logout');
    };

    this.isAuthenticated = function() {
      return authenticated;
    };
  };
})();
