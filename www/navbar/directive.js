(function() {
  'use strict';

  angular.module('oms.navbar')
    .directive('navBar', function() {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'navbar/templates/navbar-directive.template.html',
        controller: 'NavbarController as navbarCtrl'
      }
    });
})();
