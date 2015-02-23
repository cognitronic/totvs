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