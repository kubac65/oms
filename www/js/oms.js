(function(){
	angular.module('oms', ['ui.router', 'oms.login', 'oms.customers', 'oms.orders', 'templates'])
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/login');

			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'login/templates/login.template.html',
					controller: 'LoginController'
				})
				.state('customers', {
					url: '/customers',
					templateUrl: 'customers/templates/customers.template.html',
					controller: 'CustomersListController',
					resolve: {
						'FetchCustomerData': function(CustomersService){
							return CustomersService.getAll();
						}
					}
				})
				.state('orders', {
					url: '/orders',
					templateUrl: 'orders/templates/orders.template.html',
					controller: 'OrdersListController',
					resolve: {
						'FetchOrdersData': function(OrdersService){
							return OrdersService.getAll();
						},
						'FetchCustomerData': function(CustomersService){
							return CustomersService.getAll();
						}
					}
				});
		}]);
})();
