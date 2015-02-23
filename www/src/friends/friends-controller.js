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