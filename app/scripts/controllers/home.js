'use strict';

angular.module('forensis.controllers')
	.controller('HomeCtrl', ['$scope', 'Strings', function($scope, Strings) {

		$scope.strings = Strings.getData();

		$scope.mainLogoHeight = jQuery('nav').css('background-color');
		console.log($scope.mainLogoHeight);

	}]);