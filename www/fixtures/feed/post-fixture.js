/**
 * Created by Danny Schreiber on 1/25/2015.
 */

(function(){ 'use strict';
    angular.module('totvs.mocks')
        .factory('PostFixtures', PostFixtures);

    var _feedList = getJSONFixture('feed/post-list.json');
    var _post = getJSONFixture('feed/post.json');

    function PostFixtures(){
        return {
	        feedList: _feedList.posts,
            post: _post
        };
    }
})();