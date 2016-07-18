'use strict';

angular.module('merchantApp')
  .controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$location', '$localStorage', 'toaster', 'AuthService'];

function LoginController($scope, $location, $localStorage, toaster, AuthService) {
  var vm = this;
  vm.account = {
    username: '',
    password: ''
  };
  vm.login = login;
  vm.errorMessage = null;
  return init();

  function init() {}

  function login() {
    AuthService
      .login(vm.account)
      .success(function(response) {
        $localStorage.token = response.data.auth_token;
        $location.path('/admin/list');
      })
      .error(function(response) {
        toaster.pop('error', '登录失败', response.message);
      });
  }
}
