(function() {
  'use strict';

  angular.module('oms.login')
    .service('LoginService', loginService);

  loginService.$inject = ['$http', '$cookies'];

  function loginService($http, $cookies) {

    this.login = function(user) {
      $http.post( 'http://localhost:9000/users/login', user)
        .then(
        function(session, error) {
          if (error) {
            alert(error.message);
            return false;
          } else {
            $cookies.sid = session.data.id; // set the sid cookie
            //$state.go('loginSuccess');
          }
        });
    };
  };
})();
