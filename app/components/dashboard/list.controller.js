(function() {
  'use strict';

  angular
    .module('merchantApp')
    .controller('DashboardListController', DashboardListController);

  DashboardListController.$inject = ['DashboardService','$compile', '$scope', '$stateParams', 'toaster', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal'];

  /* @ngInject */
  function DashboardListController(DashboardService,$compile, $scope, $stateParams, toaster, DTOptionsBuilder, DTColumnBuilder, $uibModal) {
    var vm = this;
    vm.open = open;
    vm.create = create;
    vm.forbid = forbid;
    vm.allow = allow;
    vm.filter = {
      status:''
    };
    vm.edit = edit;
    vm.status = [{id:'待开户',name:'待开户'},{id:'正常',name:'正常'},{id:'已禁用',name:'已禁用'}]
    return init();

    function init() {
      initDt();

      $scope.$watch('vm.filter', function(newValue, oldValue) {
        if (newValue != oldValue) {
          vm.dtInstance.reloadData();
        }
      }, true);
    }

    function initDt() {
      vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', dtAjax)
        .withDataProp('data')
        .withOption('createdRow', createdRow)
        .withOption('filter', true)
        .withOption('order', [[1, 'asc']]);

      vm.dtColumns = [
        DTColumnBuilder.newColumn(null).withTitle('#').withOption('width', '20px').notSortable().renderWith(function(data, type, full, meta) {
          return meta.row + meta.settings.oAjaxData.start + 1;
        }),
        DTColumnBuilder.newColumn('name').withTitle('招生单位'),
        DTColumnBuilder.newColumn('contact').withTitle('联系人'),
        DTColumnBuilder.newColumn('mobile').withTitle('手机号'),
        DTColumnBuilder.newColumn('domain_name').withTitle('二级域名'),
        DTColumnBuilder.newColumn('status').withTitle('状态'),
        DTColumnBuilder.newColumn(null).withTitle('操作').withOption('width', '133px').notSortable().renderWith(actionsHtml)
      ];

      vm.dtInstance = {};
    }

    function dtAjax(data, callback, settings) {
      var params = convertDtData(data);
      //angular.extend(params, vm.filter);
      params['status'] = vm.filter.status;
      DashboardService
          .list(params)
         .then(function(res) {
          callback(convertDtResponse(res.data));
         });
    }

    function actionsHtml(data, type, full, meta) {
      var html =
        '<button class="btn btn-white btn-xs" uib-tooltip="编辑" ng-click="vm.edit(' + data.id +')">' +
        '   <i class="fa fa-fw fa-edit"></i>' +
        '</button>&nbsp;'
      if (full.status === '已禁用') {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="通过" ng-click="vm.allow(' + data.id + ')">' +
          '<i class="fa fa-bullhorn" aria-hidden="true"></i>' +
          '</button>&nbsp;';
          // '<button class="btn btn-white btn-xs" uib-tooltip="账号" ng-click="vm.unpublish(' + data.id + ')">' +
          // '<i class="fa fa-users" aria-hidden="true"></i>' +
          // '</button>&nbsp;' ;
      }
      if (full.status === '待开户') {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="开户" ng-click="vm.open('+ data.id +')">' +
          ' <i class="fa fa-unlock" aria-hidden="true"></i>' +
          '</button>&nbsp;';
      }
      if (full.status === '正常') {
        html +=
          '<button class="btn btn-white btn-xs" uib-tooltip="禁用" ng-click="vm.forbid(' + data.id + ')">' +
          '<i class="fa fa-ban" aria-hidden="true"></i>' +
          '</button>&nbsp;' +
          '<a class="btn btn-white btn-xs" uib-tooltip="管理" href="http://www.baidu.com">' +
          '<i class="fa fa-book" aria-hidden="true"></i>' +
          '</a>&nbsp;';
          // '<button class="btn btn-white btn-xs" uib-tooltip="账号" ng-click="vm.unpublish(' + data.id + ')">' +
          // '<i class="fa fa-users" aria-hidden="true"></i>' +
          // '</button>&nbsp;' ;
      }

      return html;
    }

    function createdRow(row, data, dataIndex) {
      // Recompiling so we can bind Angular directive to the DT
      $compile(angular.element(row).contents())($scope);
    }
    function create() {
      $uibModal.open({
            animation: true,
            templateUrl: 'components/dashboard/create.html',
            controller: 'DashboardCreateController',
            controllerAs: 'vm',
            size: 'md'
          });
    }
    function open(id) {
      $uibModal.open({
        animation: true,
        templateUrl: 'components/dashboard/open_account.html',
        controller: 'DashboardOpenController',
        controllerAs: 'vm',
        size: 'md',
        resolve:{
          hospitalId:id
        }
      });
    }
    function edit(id) {
      $uibModal.open({
        animation: true,
        templateUrl: 'components/dashboard/edit.html',
        controller: 'DashboardEditController',
        controllerAs: 'vm',
        size: 'md',
        resolve:{
          hospitalId:id
        }
      });
    }
    function forbid(id) {
      DashboardService
        .forbid(id)
        .then(function (res) {
          toaster.pop('success','已禁用');
          vm.dtInstance.reloadData();
        })
    }
    function allow(id) {
      DashboardService
        .allow(id)
        .then(function (res) {
          toaster.pop('success','已开通');
          vm.dtInstance.reloadData();
        })
    }

    // function remove(noticeId) {
    //   NoticeService
    //     .remove(noticeId)
    //     .then(function() {
    //       vm.dtInstance.reloadData(null, false);
    //     });
    // }

    // function preview(id) {
    //   $uibModal.open({
    //     animation: true,
    //     templateUrl: 'components/qrcode/preview.html',
    //     controller: 'QrCodePreviewController',
    //     controllerAs: 'vm',
    //     size: 'sm',
    //     resolve: {
    //       url: function() {
    //         return vm.notices[id]['preview_url'];
    //       }
    //     }
    //   });
    // }
  }
})();
