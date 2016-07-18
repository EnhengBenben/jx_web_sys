'use strict';

angular
  .module('merchantApp')
  .constant('ENDPOINT', 'http://a130626.jx114.com/api')
  //.constant('ENDPOINT', 'http://sys.jx114.conglinnet.com/api')
  //.constant('ENDPOINT', '/api')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
  // .config(["$locationProvider", function($locationProvider) {
  //   $locationProvider.html5Mode(true);
  // }])
  .run(['$localStorage', '$http', function($localStorage, $http) {
    // 配置Datatables默认选项
    $.extend($.fn.dataTable.defaults, {
      pageLength: 25,
      //processing: true,
      serverSide: true,
      responsive: true,
      pagingType: 'full_numbers',
      language: {
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
          "sFirst": "首页",
          "sPrevious": "上页",
          "sNext": "下页",
          "sLast": "末页"
        },
        "oAria": {
          "sSortAscending": ": 以升序排列此列",
          "sSortDescending": ": 以降序排列此列"
        }
      },
      "order": [
        [1, 'asc']
      ]
    });
  }])
  .run(function() {
    moment.locale('zh-CN');
    moment.tz.setDefault("Asia/Hong_Kong");
  })
  .config(function($provide) {
    // 允许angular datepicker在空时间的情况下显示空输入
    // https://github.com/g00fy-/angular-datepicker/issues/199
    $provide.decorator('mFormatFilter', function() {
      return function newFilter(m, format, tz) {
        if (!m) {
          return '';
        }
        if (!moment.isMoment(m)) {
          m = moment(m);
        }
        return tz ? moment.tz(m, tz).format(format) : m.format(format);
      };
    });
  });
