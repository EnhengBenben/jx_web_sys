"use strict";

angular.module('merchantApp')
  .factory('authInterceptor', ['$location', '$localStorage', 'ENDPOINT', '$q', 'toaster', function($location, $localStorage, ENDPOINT, $q, toaster) {
    var authInterceptor = {
      request: function(config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        } else {
          if (response.status === 422) {
            var detail = '';
            for (var p in response.data.errors) {
              detail += '\n' + response.data.errors[p][0];
            }
            toaster.pop('error', response.data.message, detail);
          } else {
            toaster.pop('error', '', response.data.message);
          }
          return $q.reject(response);
        }
      }
    };
    return authInterceptor;
  }]);
