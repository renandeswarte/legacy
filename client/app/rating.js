'use strict';

var rating = angular.module('rating', []);

rating.controller('ratingController', ['$scope','$http', 'Meals', function ($scope, $http, Meals, idTool) {
    $scope.starRating1 = 0;
    $scope.starRating2 = 1;
    // Meals.getMeals()
    // .then(function(data) {
    //     // console.log('DATA from mongo', data[0].rating,data[0].ratingCount);
    //     $scope.avgRating=(data[0].rating)/(data[0].ratingCount);
    //     $scope.data = data;
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });
    $scope.Math = window.Math;

    $scope.click1 = function (param, id) {

        $scope.ratingPair = {
            rating : param,
            id : id
        }

        Meals.updateRating($scope.ratingPair)
        .then(function(data) {
            console.log('DATA from updateRating', data);
            console.log("pair:",$scope.ratingPair.id);
        }).catch(function(err) {
            console.log(err);
        })


        // Meals.getMeals()
        // .then(function(data) {
        //    for(i=0;i<data.length;i++){
        //     console.log((data[i].rating)/(data[i].ratingCount));
        //    };

        //     $scope.avgRating=[];
        //     $scope.data = data;
        // })
        // .catch(function(err) {
        //     console.log(err);
        // })

    };

}]);

rating.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            readOnly: '@',
            click: "&",
            mouseHover: "&",
            mouseLeave: "&"
        },
        restrict: 'EA',
        template:
        "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
        <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
        ng-Click='isolatedClick($index + 1)' \
        ng-mouseenter='isolatedMouseHover($index + 1)' \
        ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
        </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];

            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;

            $scope.isolatedClick = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope.rating = $scope._rating = param;
                $scope.hoverValue = 0;
                $scope.click({
                    param: param
                });
            };

            $scope.isolatedMouseHover = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = 0;
                $scope.hoverValue = param;
                $scope.mouseHover({
                    param: param
                });
            };

            $scope.isolatedMouseLeave = function (param) {
                if ($scope.readOnly == 'true') return;

                $scope._rating = $scope.rating;
                $scope.hoverValue = 0;
                $scope.mouseLeave({
                    param: param
                });
            };
        }
    };
});