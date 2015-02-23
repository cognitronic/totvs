/**
 * @author Danny Schreiber on 8/12/2014.
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
		 * Constants representing the available items in the cache.  This allows for using dot notation.
		 *
		 * @namespace
		 * @property {object} UserInfo - global user info
		 * @property {object} UserInfo.orgId - currently logged in users's org id
		 * @memberOf CacheService
		 */
		var _cacheItems = {
			UserInfo: {
				orgId: 'orgId',
				selectedOrg: 'selectedOrg',
				userOrgs: 'userOrgs',
				userData: 'userData',
				userId: 'userId',
				browserSupportChecked: 'browserSupportChecked'
			},
			Referrals: {
				selectedReferral: 'selectedReferral',
				selectedStatus: 'selectedStatus'
			},
			Profile: {
				loadedProfile: 'loadedProfile',
				allClnServices: 'clnServices',
				allNclnServices: 'nclnServices'
			},
			Reports: {
				selectedReport: 'selectedReport'
			},
			Codelists:{
				locList: 'locList',
				allLists: 'allLists',
				declineReasons: 'declineReasons'
			},
			Documents:{
				showAddNewReferral: 'showAddNewReferral'
			},
			TreeInfo: {
				selectedCustomerID: "selectedCustomerID",
				selectedFacilityID: "selectedFacilityID"
			},
			Internal: {
				userData: "internalUserData"
			},
			User: {
				userData: "userData"
			},
			Customer: {
				customerData: "customerData"
			}
		};

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
			Items: _cacheItems,
            clearCache: _clearCache
		};
	};

	angular.module('ram-utilities.ui.cache.service', []).factory('CacheService', [CacheService]);
})();