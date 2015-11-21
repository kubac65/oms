(function(){
	angular.module('oms', ['ui.router', 'oms.customers', 'oms.orders', 'templates', 'dpd'])
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/login');

			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'login/templates/login.template.html'
				})
				.state('customers', {
					url: '/customers',
					templateUrl: 'customers/templates/customers.template.html',
					resolve: {
						'FetchCustomerData': function(CustomersService){
							return CustomersService.getAll();
						}
					}
				})
				.state('orders', {
					url: '/orders',
					templateUrl: 'orders/templates/orders.template.html',
					resolve: {
						'FetchOrdersData': function(OrdersService){
							return OrdersService.getAll();
						},
						'FetchCustomerData': function(CustomersService){
							return CustomersService.getAll();
						}
					}
				});
		}])

		.value('dpdConfig', {
			collections: ['customers', 'orders'],
		  serverRoot: 'http://localhost:9000/',
			socketOptions: { reconnectionDelayMax: 3000},
			useSocketIo: false,
			noCache: true
		});
})();
