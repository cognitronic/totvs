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