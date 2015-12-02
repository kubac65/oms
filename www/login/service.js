(function() {
  'use strict';

  angular.module('oms.login')
    .service('AuthService', authService);

  authService.$inject = ['$q'];

  function authService($q) {
    var auth = {
      user: {},
      authenticated: false
    };

    this.login = function(user) {
      var defer = $q.defer();

      dpd.users.login(user)
        .then(function success(result){
          auth.authenticated = true;
          defer.resolve(result);
        }, function error(err){
          defer.reject(err);
        });

      return defer.promise;
    };

    this.logout = function() {
      var defer = $q.defer();

      dpd.users.logout()
        .then(function success() {
          auth.authenticated = false;
          auth.user = {};
          defer.resolve();
        }, function error(err) {
          defer.reject(err);
        });

      return defer.promise;
    };

    this.isAuthenticated = function() {
      return auth.authenticated;
    };
  };
})();
