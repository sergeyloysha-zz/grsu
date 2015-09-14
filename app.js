var grsuControllers = angular.module('grsuControllers', []);

grsuControllers.controller('TeachersCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('http://api.grsu.by/1.x/app1/getTeachers?extended=true').success(function(data) {
		$scope.teachers = data.items;
    });

	$scope.predicate = '';
	$scope.reverse = false;
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};

}]);

grsuControllers.controller('ScheduleCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.faculties = [];
	$scope.departments = [];
	$scope.cources = [
		{"id": 1, "title": "1 курс"},
		{"id": 2, "title": "2 курс"},
		{"id": 3, "title": "3 курс"},
		{"id": 4, "title": "4 курс"},
		{"id": 5, "title": "5 курс"},
		{"id": 6, "title": "6 курс"}
	];
	$scope.groups = [];
	$scope.schedule = [];

	$http.get('http://api.grsu.by/1.x/app1/getFaculties').success(function(data) {
		$scope.faculties = data.items;
	});

	$http.get('http://api.grsu.by/1.x/app1/getDepartments').success(function(data) {
		$scope.departments = data.items;
	});

	$scope.updateGroups = function() {

		console.log('Факультет: ' + $scope.selectedFaculty + '\nФорма: ' + $scope.selectedDepartment + '\nКурс: ' + $scope.selectedCource);

		faculty = $scope.selectedFaculty;
		department = $scope.selectedDepartment;
		course = $scope.selectedCource;

		$http.get('http://api.grsu.by/1.x/app1/getGroups?facultyId='+ faculty +'&departmentId='+ department +'&course='+ course +'').success(function(data) {
			$scope.groups = data.items;
		});
	}

	$scope.showSchedule = function() {
		console.log('show schedule for '+ $scope.selectedGroup +' group');

		group = $scope.selectedGroup;

		$http.get('http://api.grsu.by/1.x/app1/getGroupSchedule?groupId='+ group +'').success(function(data) {
			$scope.schedule = data;
		});
	}

}]);

var grsuApp = angular.module('grsuApp', [
  'ngRoute',
  'grsuControllers'
]);

grsuApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
	when('/teachers', {
		templateUrl: 'partials/teachers.html',
		controller: 'TeachersCtrl'
	}).
	when('/schedule', {
		templateUrl: 'partials/schedule.html',
		controller: 'ScheduleCtrl'
	}).
	otherwise({
		redirectTo: '/teachers'
	});
}]);