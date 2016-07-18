
/**
 * Created by yong on 16/5/7.
 */
(function () {
  'use strict';

  angular.module('merchantApp')
    .controller('DashboardEditController',DashboardEditController)
  DashboardEditController.$inject = ['DashboardService','hospitalId','$uibModalInstance','toaster'];
  function DashboardEditController(DashboardService,hospitalId,$uibModalInstance,toaster) {
    var vm = this;
    vm.edit = {
      admin:{
        data:{
          password:''
        }
      }
    };
    DashboardService
      .edit(hospitalId)
      .then(function (res) {
        vm.edit = res.data.data;
        vm.edit.admin.data.password = "******"
        if(vm.edit.admin.data.password){
          vm.password = vm.edit.admin.data.password;
        }
      });
    vm.save = function () {
      var data = vm.edit;
      if(vm.edit.admin.data.password != vm.password){
        data['password'] = vm.edit.admin.data.password;
      }
      DashboardService
        .update(hospitalId,data)
        .then(function (res) {
          toaster.pop('success','修改成功');
          $uibModalInstance.dismiss('cancel');
        })
    }
  }
})();

