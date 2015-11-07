'use strict';

var rating = angular.module('rating', []);

rating.controller('ratingController', ['$scope','$http', 'Meals', function ($scope, $http, Meals, idTool) {
    $scope.starRating1 = 0;
    Meals.getMeals()
    .then(function(data) {
        // console.log('DATA from mongo', data[0].rating,data[0].ratingCount);
        $scope.avgRating=(data[0].rating)/(data[0].ratingCount);
        $scope.data = data;
    })
    .catch(function(err) {
        console.log(err);
    });



    $scope.click1 = function (param, id) {

        // console.log('Inside Click', param, id);
        // Meals.addMeal(param)
        // .then(function(data){
        //     console.log(data);
        // })

        //Assign new Rating to a Variable
        // $scope.newRating = param;
        // $scope.barberId = id;
        $scope.ratingPair = {
            rating : param,
            id : id
        }

        // console.log($scope.ratingPair);

        //Call addRating function and pass in newRating and ID
            //
        Meals.updateRating($scope.ratingPair)
        .then(function(data) {
            console.log('DATA from updateRating', data);
        }).catch(function(err) {
            console.log(err);
        })

        Meals.getMeals()
        .then(function(data) {
            // console.log('getMeals data from MongoDB for first barber', data[0].rating, data[0].ratingCount);
            $scope.avgRating=(data[0].rating)/(data[0].ratingCount);
            $scope.data = data;
        })
        .catch(function(err) {
            console.log(err);
        })

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