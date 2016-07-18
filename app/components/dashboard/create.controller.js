/**
 * Created by yong on 16/5/7.
 */
(function () {
  'use strict';

  angular.module('merchantApp')
    .controller('DashboardCreateController',DashboardCreateController)
  DashboardCreateController.$inject = ['DashboardService','$compile','toaster','$uibModalInstance'];
  function DashboardCreateController(DashboardService,$compile,toaster,$uibModalInstance) {
    var vm = this;
    vm.save = save;
    return init();
    function init() {


    }
    function save() {
      DashboardService
        .create(vm.create)
        .then(function (res) {
          toaster.pop('success','添加成功');
          $uibModalInstance.dismiss('cancel');
          location.reload();
        })
    }

  }

})();
