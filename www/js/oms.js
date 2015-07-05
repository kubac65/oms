(function(){
	var app = angular.module('oms', ['ui.router', 'oms.customers']);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('jobs', {
				url: '/jobs',
				templateUrl: 'jobs/jobs.template.html'
			})
			.state('customers', {
				url: '/customers',
				templateUrl: 'customers/customers.template.html'
			});
	}]);
})();
