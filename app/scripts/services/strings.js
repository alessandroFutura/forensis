'use strict';

angular.module('forensis.services')
	.factory('Strings', ['$http', function($http) {

		var data = null;

		var promise = $http.get('../strings.json').then(function(success) {
			data = success.data;
		}, function(error) {
			console.log('could not load strings.json', error);
		});

		return {
			promise: promise,
			getData: function() {
				return data;
			}
		};

	}]);