/**
 * Created by Danny Schreiber on 2/16/15.
 */

angular.module('totvs.services', []);
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
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
    var AboutController = function(){

    };

	angular.module('totvs').controller('AboutController', [AboutController]);
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
	var fixContainer = function() {

		var link = function (scope, element, attrs) {

			function resizeContainers(containerId) {
				var heights = $(containerId).map(function () {
						return $(this).height();
					}).get(),

					maxHeight = Math.max.apply(null, heights) * 2;

				$(containerId).height(maxHeight);
			}
			resizeContainers(element);
		};
		return {
			restrict: 'EA',
			link: link
		};
	};

	angular.module('totvs').directive('fixContainer', [fixContainer]);

})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
	/*jslint smarttabs:true */
	angular.module('totvs').constant('Constants', {
		ROUTES: {
			FEED_DATA: 'src/core/data/feed.json',
			FRIENDS_DATA: 'src/core/data/friends.json'
		},
		CACHE: {
			FEED: 'feedList'
		}
	});
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
    var HeaderController = function($state){

    };

	angular.module('totvs').controller('HeaderController', ['$state', HeaderController]);
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
	/**
	 * @constructor CacheService
	 * @classdesc The cache service is a wrapper for the sessionStorage object and allows for client side state management.
	 *
	 * @returns {{setItem: _setItem, getItem: _getItem, removeItem: _removeItem, Items: {UserInfo: {orgId: string, selectedOrg: string, userOrgs: string, userData: string, userId: string, browserSupportChecked: string}, Referrals: {selectedReferral: string, selectedStatus: string}, Profile: {loadedProfile: string, allClnServices: string, allNclnServices: string}, Reports: {selectedReport: string}, Codelists: {locList: string, allLists: string, declineReasons: string}, Documents: {showAddNewReferral: string}}, clearCache: _clearCache}}
	 *
	 */
	var CacheService = function(){



		/**
		 * Inserts an item into session storage object
		 * @param {key} string name
		 * @param {val} object value that will be stringified and stored
		 * @function setItem
		 * @memberOf CacheService
		 */
		var _setItem = function(key, val) {
			sessionStorage.setItem(key, JSON.stringify(val));
		};

		/**
		 * Retrieves an item from the cache
		 * @param {item} string name of the key
		 * @function getItem
		 * @memberOf CacheService
		 */
		var _getItem = function(item) {
			if(angular.fromJson){
				return angular.fromJson(sessionStorage.getItem(item));
			}
		};

		/**
		 * Removes an item from the cache
		 *
		 * @param {item} string name of the key
		 * @function removeItem
		 * @memberOf CacheService
		 */
		var _removeItem = function(item) {
			sessionStorage.removeItem(item);
		};

		/**
		 *Clears all data from the local sessionStorage object
		 *
		 * @function clearCache
		 * @memberOf CacheService
		 */
		var _clearCache = function(){
			sessionStorage.clear();
		};



		return {
			setItem: _setItem,
			getItem: _getItem,
			removeItem: _removeItem,
			clearCache: _clearCache
		};
	};

	angular.module('totvs.services').factory('CacheService', [CacheService]);
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
	var FeedController = function(FeedService, Constants){

		var fc = this;
		fc.feed = [];
		fc.newPost = {};
		fc.getFeedData = getFeedData;
		fc.init = init;
		fc.sharePost = sharePost;
		fc.clearPost = clearPost;
		fc.init();

		function init(){
			fc.getFeedData();
		}

		function getFeedData(){
			fc.feed = [];
			FeedService.getFeedData().then(function(data){
				fc.feed = data.feed;
			});
		}

		function sharePost(post){
			fc.newPost = {
				name: "Danny Schreiber",
				dateShared: "Feb 23, 2015",
				location: "Modesto, CA",
				thumbnail:"http://res.cloudinary.com/raven-art-media/image/upload/v1422983670/me2_a8bkrt.png",
				imagePath:"https://lh5.googleusercontent.com/-v7VirZyHkMg/VOtM9ulbskI/AAAAAAAAfOo/7_AD15FfE-Y/w1000-h667/smith%2Bpond%2B20140607%2Bmilk%2Bway%2Bzoom.jpg",
				messageBody: post.messageBody
			};
			FeedService.savePost(fc.newPost).then(function(data){
				fc.clearPost();
				fc.getFeedData();
			});
		}

		function clearPost(){
			fc.newPost.messageBody = '';
		}

	};

	angular.module('totvs').controller('FeedController', ['FeedService', 'Constants', FeedController]);
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */


(function(){ 'use strict';
    var FeedService = function(RestService, $q, Constants, CacheService){

	    var _getFeedData = function(){
		    var deferred = $q.defer();
		    var _success = function(data){
			    CacheService.setItem(Constants.CACHE.FEED, data);
			    deferred.resolve(data);
		    };

		    var _error = function(data){
			    deferred.resolve(data);
		    };

		    if(CacheService.getItem(Constants.CACHE.FEED)){
			    deferred.resolve(CacheService.getItem(Constants.CACHE.FEED));
		    } else {
			    RestService.getData(Constants.ROUTES.FEED_DATA, null, null, _success, '', _error, {showLoader: true});
		    }
		    return deferred.promise;
	    };

	    var _savePost = function(post){
		    var deferred = $q.defer();
		    var tempFeed = CacheService.getItem(Constants.CACHE.FEED);
		    tempFeed.feed.push(post);
		    CacheService.setItem(Constants.CACHE.FEED, tempFeed);
		    deferred.resolve('done');
		    return deferred.promise;
	    };

	    return {
		    getFeedData: _getFeedData,
		    savePost: _savePost
	    };

    };

	angular.module('totvs.services').factory('FeedService', ['RestService', '$q', 'Constants', 'CacheService', FeedService]);
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
	var FriendsController = function(FriendsService, Constants){
		var fc = this;
		fc.friends = [];

		fc.getFriends = getFriends;
		fc.init = init;

		fc.init();


		function init(){
			fc.getFriends();
		}

		function getFriends(){
			FriendsService.getFriendsData()
				.then(function(data){
					fc.friends = data.profiles;
				});
		}
	};

	angular.module('totvs').controller('FriendsController', ['FriendsService', 'Constants', FriendsController]);
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */

(function(){ 'use strict';
	var FriendsService = function(RestService, $q, Constants){

		var _getFriendsData = function(){
			var deferred = $q.defer();
			var _success = function(data){deferred.resolve(data);};
			var _error = function(data){deferred.resolve(data);};
			RestService.getData(Constants.ROUTES.FRIENDS_DATA, null, null, _success, '', _error, {showLoader: true});
			return deferred.promise;
		};

		return {
			getFriendsData: _getFriendsData
		};

	};

	angular.module('totvs.services').factory('FriendsService', ['RestService', '$q', 'Constants', FriendsService]);
})();
/**
 * Created by Danny Schreiber on 2/23/2015.
 */
(function(){ 'use strict';
	var PhotosController = function(){

	};

	angular.module('totvs').controller('PhotosController', [PhotosController]);
})();