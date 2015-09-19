/**
 * Created by Victor on 9/8/2015.
 */
var app = angular.module('BabyClinic', ['ui.router', 'nvd3']);

//routes for the various pages
app.config([
    '$stateProvider',
    '$urlRouterProvider',function ($stateProvider,$urlRouterProvider ){
        $stateProvider
        .state('login',{
            url: '/login',
            controller: 'LogInController',
            templateUrl: 'views/login.html'
        })
        .state('signup',{
            url: '/signup',
            controller: 'SignUpController',
            templateUrl: 'views/signup.html'
        })
        .state('dashboard',{
            url: '/dashboard',
            controller: 'DashboardController',
            templateUrl: 'views/dashboard.html'
        })
        .state('kids',{
            url: '/kids',
            controller: 'KidsController',
            templateUrl: 'views/kids.html'
        })
        .state('editbaby',{
             url: '/edit',
             controller: 'EditBabyController',
             templateUrl: 'views/editbaby.html'
            })
        .state('data',{
            url: '/data',
            controller: 'DataController',
            templateUrl: 'views/data.html'
        });


        $urlRouterProvider.otherwise('login');
}]);



