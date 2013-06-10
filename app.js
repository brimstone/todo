angular.module('todo_app', ['ui.bootstrap', 'ui.brimstone.tpls', 'ui.brimstone.slider', 'ngResource']);

function todo_ctlr($scope, $resource) {
	$scope.lists = $resource(':action.json');
	$scope.blah = window.innerWidth;
	$scope.groups = $scope.lists.get({action: "getlist"}, function() {
		console.log("Something!");
	});
}

angular.module("ui.brimstone.tpls", ["template/slider/slider.html"]);
angular.module("ui.brimstone.slider", []).directive('slider', function () {
	return {
		restrict: 'EA',
		templateUrl: 'template/slider/slider.html',
		transclude: true,
		replace: true,
		scope: { },
		link: function(scope, iElement, iAttrs, controller) {
			scope.id = iAttrs.id;
			scope.value = iAttrs.value;
		}
	};
});

angular.module("template/slider/slider.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("template/slider/slider.html",
		"<label class=\"checkbox toggle well\">\n" +
		"	<input id=\"{{id}}\" type=\"checkbox\" checked />\n" +
		"	<p>\n" +
		"		{{value}}\n" +
		"		<span>On</span>\n" +
		"		<span>Off</span>\n" +
		"	</p>\n" +
		"	<a class=\"btn btn-primary slide-button\"></a>\n" +
		"</label>\n" +
		"");
}]);


// Rob Conery's Show Me AngularJS http://tekpub.com/products/angular
