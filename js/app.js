angular.module('todo_app', ['ui.bootstrap', 'ui.brimstone.tpls', 'ui.brimstone.slider', 'ngResource']);

function todo_ctlr($scope, $resource) {
	$scope.api = $resource('api.php?action=:action', {}, {save: {method: 'POST', params: {action: "save"}}});
	$scope.blah = window.innerWidth;
	$scope.allitems = [];
	$scope.newitem = {};
	$scope.breadcrumbs = [];
	$scope.loaded = false;
	$scope.timer = 0;
	$scope.currentid="";
	$scope.update = function() {
		$scope.allitems = $scope.api.get({action: "get"}, function() {
			$scope.loaded = true;
			$scope.switchTo($scope.currentid);
		});
	};
	$scope.update();
	//setInterval($scope.update, 10000);
	$scope.switchTo = function(parent) {
		// clear out our items
		$scope.items = [];
		// look at all of our items
		for(var item in $scope.allitems) {
			// if we find our parent
			if ($scope.allitems[item].parent == parent) {
				$scope.allitems[item].id = item;
				$scope.items.push($scope.allitems[item]);
			}
		}
		$scope.breadcrumbs = [];
		$scope.currentid = parent;
		while(parent != ""){
			var item = $scope.allitems[parent];
			$scope.breadcrumbs.push(parent);
			parent = item.parent;
		};
	};
	$scope.findChildren = function(parent){
		var count = 0;
		for(var item in $scope.allitems) {
			if ($scope.allitems[item].parent == parent) {
				count++;
			}
		}
		return count;
	};
	$scope.addItem = function(){
		$scope.allitems[guid()] = {"title": "New Item", "completed": false, "due": "next week", "parent": $scope.currentid};
		$scope.switchTo($scope.currentid);
	};
	$scope.$watch('allitems', function (newValue, oldValue) {
		// look to see if our items are actually loaded or not
		var loaded = false;
		for(var item in oldValue){
			if(item.charAt(0) != "$") {
				loaded = true;
				break;
			}
		}
		if (!loaded) {return;}
		// now that we've determined everything is loaded properly
		// clear our timer if it's set
		if ($scope.timer != 0) {
			clearTimeout($scope.timer);
		}
		// set our timer to update our server after 2 seconds
		$scope.timer = setTimeout(function(){alert("saving items"); $scope.allitems.$save(); $scope.timer = 0}, 5000);
	}, true);
}

function guid() {
	return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
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
//		"		{{value}}\n" +
		"		<span>On</span>\n" +
		"		<span>Off</span>\n" +
		"	</p>\n" +
		"	<a class=\"btn btn-primary slide-button\"></a>\n" +
		"</label>\n" +
		"");
}]);


// Rob Conery's Show Me AngularJS http://tekpub.com/products/angular
