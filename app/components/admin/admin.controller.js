'use strict';

angular.module('merchantApp')
  .controller('AdminController', AdminController);

AdminController.$inject = ['$state', '$localStorage', '$uibModal'];

function AdminController($state, $localStorage, $uibModal) {
  var admin = this;
  admin.logout = logout;
  admin.openPublishDialog = openPublishDialog;
  return init();

  function init() {}

  function logout() {
    $localStorage.token = null;
    $state.go('login');
  }

  function openPublishDialog() {
    $uibModal.open({
      animation: true,
      templateUrl: 'components/publish/dialog.html',
      controller: 'PublishDialogController as vm',
      size: 'md'
    });
  }
}
