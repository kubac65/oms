(function() {
  'use strict';

  angular.module('oms.auth')
    .service('AuthService', authService);

  authService.$inject = ['$q'];

  function authService($q) {
    this.auth = {
      user: {},
      authenticated: false
    };

    var _this = this;

    this.login = function(user) {
      var defer = $q.defer();

      dpd.users.login(user)
        .then(function success(res){
          _this.auth.authenticated = true;
          _this.auth.user = res;
          defer.resolve(res);
        }, function error(err){
          defer.reject(err);
        });

      return defer.promise;
    };

    this.logout = function() {
      var defer = $q.defer();

      dpd.users.logout()
        .then(function success(res) {
          _this.auth.authenticated = false;
          _this.auth.user = {};
          defer.resolve();
        }, function error(err) {
          defer.reject(err);
        });

      return defer.promise;
    };

    this.isAuthenticated = function() {
      return _this.auth.authenticated;
    };
  };
})();
