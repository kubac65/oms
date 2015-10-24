(function(){
	var app = angular.module('oms', ['ui.router', 'oms.customers', 'oms.orders', 'templates']);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('orders', {
				url: '/orders',
				templateUrl: 'orders/orders.template.html'
			})
			.state('customers', {
				url: '/customers',
				templateUrl: 'customers/customers.template.html'
			});
	}]);
})();
