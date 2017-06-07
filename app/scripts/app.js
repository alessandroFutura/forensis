'use strict';

angular.module('forensis.controllers', [ ]);
angular.module('forensis.services', [ ]);

angular.module('forensis', [
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'forensis.controllers',
		'forensis.services',
		'ngParallax',
		'ngMap'
	])
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('');
		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false			
		// });
	}])
	.config(['$routeProvider', function($routeProvider) {

		var resolve = {
			'StringsData': ['Strings', function(Strings) {
				return Strings.promise;
			}]
		};

		$routeProvider
			.when('/', {
				name: 'home',
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'home',
				resolve: resolve
			})
			.when('/sobre', {
				name: 'about',
				templateUrl: 'views/about.html',
				controller: 'AboutCtrl',
				controllerAs: 'about',
				resolve: resolve
			})
			.when('/servicos', {
				name: 'works',
				templateUrl: 'views/works.html',
				controller: 'WorksCtrl',
				controllerAs: 'works',
				resolve: resolve
			})
			.when('/contato', {
				name: 'contact',
				templateUrl: 'views/contact.html',
				controller: 'ContactCtrl',
				controllerAs: 'contact',
				resolve: resolve
			})
			.otherwise({
				redirectTo: '/'
			});

	}])
	.run(['$rootScope', '$location', '$window', 'Strings', function($rootScope, $location, $window, Strings)
	{
		function updateNav()
		{
			if ($window.innerWidth >= 768)
			{
				if ($rootScope.currentPath == '/')
				{
					var opacity = Math.min( 100, 0 + $rootScope.scrollY * 0.5 ) / 100;

					jQuery('nav.navbar').css({
						'padding-top': ( 20 - opacity * 20 ) + 'px',
						'background-color': 'rgba(' + 202 + ',' + 145 + ',' + 42 + ',' + opacity + ')'
					});

					var cfg = {
						width : 322,
						margin : 16,
						to : 178
					}

					if( $window.innerWidth <= 992 )
					{
						cfg.width = 248;
						cfg.margin = 8;
					}

					console.log(cfg);
					jQuery('#main-logo').css({
						'width': ( cfg.width - ( opacity * ( cfg.width - cfg.to ))) + 'px',
						'margin-top': ( -cfg.margin + opacity * cfg.margin ) + 'px'
					});
				}
			}
		}

		$rootScope.loading = {
			count: 0,
			isLoading: function(){
				return this.count > 0
			},
			load: function(){
				this.count++;
			},
			unload: function(){
				this.count--;
				this.count < 0 ? this.count = 0 : null
			}
		};

		$rootScope.$on('$routeChangeStart', function(event, next, current) {
			$rootScope.currentPath = $location.path();
		});

		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {		
			updateNav();
			var nav = jQuery('#navbar ul:first-child');
			jQuery(nav).find('li').removeClass('active');
			jQuery(nav).find('li[name="' + current.name + '"]').addClass('active');
		});

		$window.onscroll = function() {
			$rootScope.scrollY = $window.scrollY;
			updateNav();
			$rootScope.$apply();
		};

		$rootScope.setCollapseNavEvent = function() {
			setTimeout(function() {
				// Esconde o navbar collapse ao clicar em um link
				jQuery('#navbar a').on('click', function() {
					if ($window.innerWidth < 768) {
						jQuery('.navbar-toggle').click();
					}
				});
			}, 500);
		}
	}]);
