(function(){
	angular.module('oms', ['ui.router', 'oms.customers', 'templates', 'dpd'])
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/customers');

			$stateProvider
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
						'FetchOrdersData': function(){
							return null;
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
