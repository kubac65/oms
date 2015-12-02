(function() {
  'use strict';

  angular.module('oms.login')
    .service('LoginService', loginService);

  loginService.$inject = ['$http', '$state'];

  function loginService($https, $state) {
    this.logged = false;

    this.login = function(user) {
      dpd.users.login(user)
        .then(function success(result){
          $state.go('customers');
        }, function err(err){
          throw err;
        });
    };

    this.logout = function() {
      dpd.users.get('logout');
    };
  };
})();
