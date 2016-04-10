(function(){
  angular.module('oms')
  .config(config)
  .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        authenticate: false,
        templateUrl: 'login/templates/login.template.html',
        controller: 'LoginController'
      })
      .state('customers', {
        url: '/customers',
        authenticate: true,
        templateUrl: 'customers/templates/customers.template.html',
        controller: 'CustomersListController'
      })
      .state('orders', {
        url: '/orders',
        authenticate: true,
        templateUrl: 'orders/templates/orders.template.html',
        controller: 'OrdersListController'
      });
  };

  run.$inject = ['$rootScope', '$state', 'AuthService'];

  function run($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      if(toState.authenticate){
        AuthService.isAuthenticated()
          .then(function success(){
            if(toState.name == 'login'){
              event.preventDefault();
            }
          }, function error(){
            $state.transitionTo("login");
            event.preventDefault();
          });
      };

      /*if (toState.authenticate && !AuthService.isAuthenticated()) {
        $state.transitionTo("login");
        event.preventDefault();
      }
      else if(AuthService.isAuthenticated() && toState.name == 'login') {
        event.preventDefault();
      }*/
    });
  };
})();
