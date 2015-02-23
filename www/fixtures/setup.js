/**
 * Created by Danny Schreiber on 1/25/2015.
 */

(function(env){ 'use strict';
    env.TESTMODE = true;

    angular.module('totvs.mocks', []);

    jasmine.getJSONFixtures().fixturesPath = 'base/www/fixtures/';

})(window);
