'use strict';

/**
 * @ngdoc overview
 * @name buySellBuyApp
 * @description
 * # buySellBuyApp
 *
 * Main module of the application.
 */
angular
  .module('bsb', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngTouch',
    'nvd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/game-over', {
        templateUrl: 'views/gameover.html',
        controller: 'GameoverCtrl'
      });
  });
