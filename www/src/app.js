/**
 * Created by Danny Schreiber on 2/16/15.
 */


angular.module('totvs', ['ui.router',
	'ui.bootstrap',
	'totvs.services',
	'ngAnimate',
	'toaster',
	'ram-utilities.ui'])
	.config(function($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
		$urlMatcherFactoryProvider.strictMode(false);
		$locationProvider.html5Mode(true);
		$httpProvider.defaults.transformRequest = function (data) {
			if (data === undefined) {
				return data;
			}
			return $.param(data);
		};

		//sets the content type header globally for $http calls
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$httpProvider.defaults.headers['delete'] = {'Content-Type': 'application/json; charset=UTF-8'};
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('feed', {
				url: '/',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/feed/list.html',
						controller: 'FeedController as fc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			//.state('about', {
			//	url: '/about',
			//	views: {
			//		'header@': {
			//			templateUrl: '/src/core/layout/header.html',
			//			controller: 'HeaderController as hc'
			//		},
			//		'main-content@': {
			//			templateUrl: 'src/about/details.html',
			//			controller: 'AboutController as ac'
			//		},
			//		'footer@': {
			//			templateUrl: '/src/core/layout/footer.html'
			//		}
			//	}
			//})
			.state('photos', {
				url: '/photos',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/photos/list.html',
						controller: 'PhotosController as pc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			})
			.state('friends', {
				url: '/friends',
				views: {
					'header@': {
						templateUrl: '/src/core/layout/header.html',
						controller: 'HeaderController as hc'
					},
					'main-content@': {
						templateUrl: 'src/friends/list.html',
						controller: 'FriendsController as fc'
					},
					'footer@': {
						templateUrl: '/src/core/layout/footer.html'
					}
				}
			});
	});