/**
 * Created by Danny Schreiber on 2/23/2015.
 */


(function(){ 'use strict';
    var FeedService = function(RestService, $q){

	    var _getFeedData = function(){
		    var deferred = $q.defer();
		    var _success = function(data){deferred.resolve(data);};
		    var _error = function(data){deferred.resolve(data);};
		    RestService.getData(Constants.ROUTES.FEED_DATA, null, null, _success, '', _error, {showLoader: true});
		    return deferred.promise;
	    };

	    return {
		    getFeedData: _getFeedData
	    };

    };

	angular.module('totvs.services').factory('FeedService', ['RestService', '$q', FeedService]);
})();