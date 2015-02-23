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