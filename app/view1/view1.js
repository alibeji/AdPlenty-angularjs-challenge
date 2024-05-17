"use strict";

angular
  .module("myApp.view1", ["ngRoute"])

  .config([
    "$routeProvider",
    function ($routeProvider) {
      $routeProvider.when("/view1", {
        templateUrl: "view1/view1.html",
        styleUrls: ['view1/view1.css'],
        controller: "View1Ctrl",
      });
    },
  ])
  .controller("View1Ctrl", [
    "$http", "$scope",
    function($http) { 
      const vm = this;
      vm.images = null;
      vm.searchTerm = "green";
      vm.currentPage = 1
      vm.isLoading = false

      const searchImages = () => {
        vm.isLoading = true
        $http({
          method: "GET",
          url: "https://api.unsplash.com/search/photos",
          params: {
            query: vm.searchTerm,
            page: vm.currentPage,
            per_page: 9,
            client_id: "mc022uV3PnBEenyHqnvPyCbvybr9q1FohSeLtqly80Q",
          },
          headers: {
            Authorization: "Client-ID mc022uV3PnBEenyHqnvPyCbvybr9q1FohSeLtqly80Q"

          }
        })
          .then(function(response) {
            vm.images = response.data;
            vm.isLoading = false
          })
          .catch(function(error) {
            console.error("Error:", error);
            vm.isLoading = false;
          });
      }

      searchImages();

      vm.searchImages = () => {
        vm.currentPage = 1
        searchImages()
      }
      vm.changePage = (direction) => {
        vm.currentPage = direction === 'next' ? vm.currentPage+1 : vm.currentPage-1
        searchImages()
      }

      vm.searchOnEnter = function($event) {
        if ($event.keyCode === 13) {
          vm.currentPage = 1
          searchImages();
        }
      };

      
    }
  ]);
