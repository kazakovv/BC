/**
 * Created by Victor on 9/8/2015.
 */
var app = angular.module('BabyClinic', ['ui.router']);

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
        .state('main',{
            url: '/main',
            controller: 'MainController',
            templateUrl: 'views/main.html'
        });


        $urlRouterProvider.otherwise('login');
}]);



