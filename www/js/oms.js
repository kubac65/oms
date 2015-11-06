(function(){
	angular.module('oms', ['ui.router', 'oms.customers', 'oms.orders', 'templates', 'dpd'])
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/customers');

			$stateProvider
				.state('orders', {
					url: '/orders',
					templateUrl: 'orders/orders.template.html'
				})
				.state('customers', {
					url: '/customers',
					templateUrl: 'customers/customers.template.html',
					resolve: {
						'FetchCustomerData': function(customersService){
							return customersService.promise;
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
