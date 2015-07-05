(function(){
	var app = angular.module('oms', ['ui.router', 'oms.customers']);

	app.config(function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/wrong-url');

		$stateProvider
			.state('customers', {
				url: '/customers',
				templateUrl: 'customers'
			});
	});
})();
