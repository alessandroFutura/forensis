'use strict';

angular.module('forensis.controllers')
	.controller('ServicesCtrl', ['$scope', 'Strings', function($scope, Strings) {
	
		$scope.strings = Strings.getData();

		$scope.$on('$viewContentLoaded', function() {
			jQuery('nav, #main-logo').removeAttr('style');
		});

	}]);