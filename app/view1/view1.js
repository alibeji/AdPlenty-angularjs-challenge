'use strict';

angular
  .module('myApp.view1', ['ngRoute'])

  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        styleUrls: ['view1/view1.css'],
        controller: 'View1Ctrl',
      });
    },
  ])
  .controller('View1Ctrl', [
    '$http',
    '$scope',
    function ($http) {
      const vm = this;
      vm.images = null;
      vm.searchTerm = '';
      vm.currentPage = 1;
      vm.isLoading = false;
      vm.searchError = false;

      vm.imageContainerWidth = 192;
      vm.imageHoverScaleRatio = 1.2;
      vm.imageDimensions = 192 * window.devicePixelRatio * 1.2;

      console.log(vm.imageDimensions);

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
          },
        })
          .then(function (response) {
            vm.images = response.data;
            vm.isLoading = false;
            console.log(response.data);
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

      searchImages();
    },
  ]);
