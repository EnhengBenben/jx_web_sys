/**
 * Created by yong on 16/5/7.
 */
/**
 * Created by yong on 16/5/7.
 */
(function () {
  'use strict';

  angular.module('merchantApp')
    .controller('DashboardOpenController',DashboardOpenController)
  DashboardOpenController.$inject = ['DashboardService','hospitalId','$uibModalInstance','$scope','toaster'];
  function DashboardOpenController(DashboardService,hospitalId,$uibModalInstance,$scope,toaster) {
    var vm = this;
    vm.save = save;
    return init();
    function init() {

    }
    function save() {
      var data = vm.admin;
      data['hospital_id'] = hospitalId;
      DashboardService
        .admin(data)
        .then(function (res) {
          toaster.pop('success','已成功开户');
          location.reload();
        })

    }
  }

})();
