(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('DashboardService', DashboardService);

  DashboardService.$inject = ['$http','ENDPOINT'];

  /* @ngInject */
  function DashboardService($http,ENDPOINT) {
    return {
      list:list,
      create:create,
      edit:edit,//获取编辑信息
      update:update,//保存编辑
      admin:admin,//开户
      forbid:forbid,//禁用
      allow:allow,//通过
    };
    function allow(id) {
      return $http({
        url:ENDPOINT + '/hospitals/'+ id + '/allow',
        method:'GET'
      })
    }
    function forbid(id) {
      return $http({
        url:ENDPOINT + '/hospitals/'+ id + '/forbid',
        method:'GET'
      })
    }
function admin(data) {
  return $http({
    url:ENDPOINT + '/admins',
    method:'POST',
    data:data
  })
}
    function list(params){
      return $http({
        url:ENDPOINT + '/hospitals',
        method:'GET',
        params:params
      })
    }
    function edit(id){
      return $http({
        url:ENDPOINT + '/hospitals/' + id,
        method:'GET'
      })
    }
    function update(id,data){
      return $http({
        url:ENDPOINT + '/hospitals/' + id,
        method:'PUT',
        data:data,
      })
    }
    function create(data){
      return $http({
        url:ENDPOINT + '/hospitals',
        method:'POST',
        data:data,
      })
    }


  }
})();
