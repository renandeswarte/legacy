angular.module('foodly', [
  'instacutz.order',
  'foodly.services',
  'instacutz.auth',
  'foodly.barbers',
  'foodly.hairstyles',
  'foodly.homepage',
  'foodly.barberProfile',
  'foodly.hairstyleProfile',
  'foodly.about',
  'rating',
  'ngRoute'
  ])

.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthController'
    })
    .when('/barbers', {
      templateUrl: 'barbers/barber-list/barber-list.html',
      controller: 'barberListController'
    })
    .when('/barbers/profile', {
      templateUrl: 'barbers/barber-profile.html',
      controller: 'barberProfileController'
    })
    .when('/hairstyles', {
      templateUrl: 'hairstyles/hairstyle-list/hairstyle-list.html',
      controller: 'hairstyleListController'
    })
    .when('/hairstyles/profile', {
      templateUrl: 'hairstyles/hairstyle-profile.html',
      controller: 'hairstyleProfileController'
    })
    .when('/order', {
      // authenticate: false,
      templateUrl: 'order/order.html',
      controller: 'OrderController'
    })
      .when('/addmeal', {
        authenticate: true,
        templateUrl: 'addMeal/addMeal.html',
        controller: 'MealController'
      })
    .when('/', {
      templateUrl: 'homepage/homepage.html',
      controller: 'HomepageController'
    })
    .when('/about', {
      templateUrl: 'about-us/about.html',
      controller: 'aboutController'
    })
    .otherwise({
      redirectTo: '/'
    });

//     //additional routes here
  $httpProvider.interceptors.push(function($window) {
    return {
      request: function (config) {
            var jwt = $window.localStorage.getItem('com.semicolon');
            if (jwt) {
              config.headers['x-access-token'] = jwt;
            }
            config.headers['Allow-Control-Allow-Origin'] = '*';
            return config;
          }
        };
    });
})

.run(function ($rootScope, $location, Auth) {
  $rootScope.SearchBar = true;
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.templateUrl === "meals/meals.html") {
      $rootScope.SearchBar = true;
    } else {
       $rootScope.SearchBar = false;
    }
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
    if (Auth.isAuth()) {
      Auth.loginorout = "Logout";
    } else {
       Auth.loginorout = "Sign in";
    }
  });
});