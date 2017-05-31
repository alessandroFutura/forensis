'use strict';

angular.module('forensis.controllers')
	.controller('HomeCtrl', ['$scope', '$window', 'Strings', function($scope, $window, Strings) {

		$scope.strings = Strings.getData();

		//$scope.mainLogoHeight = jQuery('nav').css('background-color');
		//console.log($scope.mainLogoHeight);

		/*jQuery('#main-logo').css({
			'width': ( $window.innerWidth <= 992 ? '248' : '322' ) + 'px',
			'margin-top': '-16px',
		});*/

	}]);