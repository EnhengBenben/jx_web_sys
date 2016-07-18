(function() {
  'use strict';

  angular
    .module('merchantApp')
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/admin/list');
      $stateProvider
        .state('admin', {
          url: '/admin',
          abstract: true,
          controller: 'AdminController as admin',
          templateUrl: 'views/main.html'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'components/auth/login.html',
          controller: 'LoginController as vm'
        })
        .state('admin.list',{
          url:'/list',
          templateUrl:'components/dashboard/list.html',
          controller:'DashboardListController as vm'
        })
    });
})();
