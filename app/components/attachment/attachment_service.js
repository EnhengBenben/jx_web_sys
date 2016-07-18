(function() {
  'use strict';

  angular
    .module('merchantApp')
    .service('AttachmentService', AttachmentService);

  AttachmentService.$inject = ['ENDPOINT', '$http'];

  /* @ngInject */
  function AttachmentService(ENDPOINT, $http) {
    return {
      create: create
    };

    function create(data) {
      var fd = new FormData();
      for (var p in data) {
        fd.append(p, data[p]);
      }

      return $http.post(ENDPOINT + '/attachments', fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      });
    }
  }

})();
