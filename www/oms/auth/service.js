(function() {
  'use strict';

  angular.module('oms.auth')
    .service('AuthService', authService);

  authService.$inject = ['$q', '$rootScope'];

  function authService($q, $rootScope) {

    this.login = function(user) {
      return dpd.users.login(user).then(function(){
        $rootScope.$broadcast('authentiction-changed');
      });

    };

    this.logout = function() {
      return dpd.users.logout().then(function(){
        $rootScope.$broadcast('authentiction-changed');
      });
    };

    this.isAuthenticated = function() {
      var defer = $q.defer();

      dpd.users.me()
        .then(function success(me){
          if(me !== '' && me !== null){
            defer.resolve(true);

          }
          else{
            defer.resolve(false);
          }
        }, function error(err){
          defer.reject(false);
        });

      return defer.promise;
    };
  };
})();
