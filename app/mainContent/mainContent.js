'use strict';

angular
  .module('myApp.mainContent', [])

  .component('mainContent', {
    templateUrl: 'mainContent/mainContent.html',
    controller: 'MainContentCtrl',
  })
  .controller('MainContentCtrl', [
    '$http',
    '$scope',
    function ($http) {
      const vm = this;
      vm.images = null;
      vm.searchTerm = '';
      vm.currentPage = 1;
      vm.isLoading = false;
      vm.searchError = false;
      vm.sortParam = 'relevant';

      vm.imageContainerWidth = 192;
      vm.imageHoverScaleRatio = 1.2;
      vm.imageDimensions = 192 * window.devicePixelRatio * 1.2;

      const searchImages = () => {
        vm.isLoading = true;
        vm.searchError = false;
        $http({
          method: 'GET',
          url: 'https://api.unsplash.com/search/photos',
          params: {
            query: vm.searchTerm || 'landscape',
            page: vm.currentPage,
            per_page: 8,
            client_id: 'mc022uV3PnBEenyHqnvPyCbvybr9q1FohSeLtqly80Q',
            order_by: vm.sortParam,
          },
        })
          .then(function (response) {
            vm.images = response.data;
            vm.isLoading = false;
          })
          .catch(function () {
            vm.searchError = true;
            vm.isLoading = false;
          });
      };

      vm.searchImages = () => {
        vm.currentPage = 1;
        searchImages();
      };

      vm.changePage = (direction) => {
        vm.currentPage =
          direction === 'next' ? vm.currentPage + 1 : vm.currentPage - 1;
        searchImages();
      };

      vm.searchOnEnter = function ($event) {
        if ($event.keyCode === 13) {
          vm.currentPage = 1;
          searchImages();
        }
      };

      vm.updateSortParam = () => {
        searchImages();
      };

      searchImages();
    },
  ]);
