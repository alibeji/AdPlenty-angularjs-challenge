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
    "$http",
    function ($http) {
      let vm=this
      vm.images=null

      $http({
        method: "GET",
        url: "https://api.unsplash.com/search/photos",
        params: {
          query: "green",
          page: 1,
          per_page: 9,
          client_id: "mc022uV3PnBEenyHqnvPyCbvybr9q1FohSeLtqly80Q",
        },
      })
        .then(function (response) {
          vm.images=response.data
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    },
  ]);
