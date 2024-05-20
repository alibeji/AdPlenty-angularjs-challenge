'use strict';
angular.module('myApp.mainContent').directive('imageGallery', function () {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'directives/imageGallery/imageGallery.html',
  };
});
