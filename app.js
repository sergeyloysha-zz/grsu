var grsuControllers = angular.module('grsuControllers', []);

grsuControllers.controller('TeacherListCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('teachers.json').success(function(data) {
		$scope.teachers = data.items;
    });

	$scope.predicate = '';
	$scope.reverse = false;
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
  
}]);

var grsuApp = angular.module('grsuApp', [
  'ngRoute',
  'grsuControllers'
]);

grsuApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
	when('/teachers', {
		templateUrl: 'partials/teacher-list.html',
		controller: 'TeacherListCtrl'
	}).
	otherwise({
		redirectTo: '/teachers'
	});
}]);