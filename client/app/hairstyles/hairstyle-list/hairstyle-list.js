angular.module('instacutz.hairstyles', [])

.controller('hairstyleListController', [
  '$scope',
  '$location',
  '$window',
  'Styles',
  'idTool',
  function($scope, $location, $window, Styles, idTool) {

    $scope.data = []; //available styles
    $scope.maximizePicture = {};

    $scope.getStyles = function() {
      Styles.getStyles()
        .then(function(data) {
          $scope.data = data;
        })
        .catch(function(err) {
          console.log(err);
        });
    };
    $scope.getStyles(); // must be called for initial page load

    $scope.setHairstyleName = function(name) {
      idTool.setHairstyleName(name);
    }

    $scope.maximize = function(picture, name) {
      $scope.maximizePicture.picture = picture;
      $scope.maximizePicture.name = name;
    };

  }
])
