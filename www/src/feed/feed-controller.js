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