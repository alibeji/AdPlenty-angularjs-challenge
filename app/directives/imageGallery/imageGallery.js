angular.module('myApp.view1').directive('imageGallery', function () {
  return {
    restrict: 'E',
    scope: {
      info: '=',
    },
    templateUrl: 'directives/imageGallery/imageGallery.html',
  };
});
