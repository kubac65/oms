(function() {
  'use strict';

  angular.module('oms.auth')
    .service('AuthService', authService);

  authService.$inject = ['$q'];

  function authService($q) {

    this.login = function(user) {
      var defer = $q.defer();

      dpd.users.login(user)
        .then(function success(res){
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
          defer.resolve();
        }, function error(err) {
          defer.reject(err);
        });

      return defer.promise;
    };

    this.isAuthenticated = function() {
      var defer = $q.defer();
      dpd.users.me()
        .then(function success(me){
          if(me !== '' && me !== null){
            defer.resolve();
          }
          else{
            defer.reject();
          }
        }, function error(err){
          defer.reject();
        });

      return defer.promise;
    };
  };
})();
