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