var grsuControllers = angular.module('grsuControllers', []);

grsuControllers.controller('TeachersCtrl', ['$scope', '$http', 'API', function($scope, $http, API) {

	$http.get(API.GET.TEACHERS).success(function(data) {
		$scope.teachers = data.items;
    });

	$scope.predicate = '';
	$scope.reverse = false;
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};

}]);

grsuControllers.controller('ScheduleCtrl', ['$scope', '$http', 'API', function($scope, $http, API) {

	$scope.faculties = undefined;
	$scope.departments = undefined;
	$scope.courses = [
		{"id": 1, "title": "1"},
		{"id": 2, "title": "2"},
		{"id": 3, "title": "3"},
		{"id": 4, "title": "4"},
		{"id": 5, "title": "5"},
		{"id": 6, "title": "6 курс"}
	];
	$scope.groups = [];
	$scope.schedule = [];

	$http.get(API.GET.FACULTIES).success(function(response) {
		$scope.faculties = response.items;
	});

	$http.get(API.GET.DEPARTMENTS).success(function(response) {
		$scope.departments = response.items;
	});

	$scope.updateGroups = function() {

		console.log('Факультет: ' + $scope.selectedFaculty + '\nФорма: ' + $scope.selectedDepartment + '\nКурс: ' + $scope.selectedCourse);

		faculty = $scope.selectedFaculty;
		department = $scope.selectedDepartment;
		course = $scope.selectedCourse;

		if(faculty != undefined && department != undefined && course != undefined) {
			$http.get(API.GET.GROUPS + '?facultyId='+ faculty +'&departmentId='+ department +'&course='+ course).success(function(data) {
				$scope.groups = data.items;
			});
		}

	}

	$scope.showSchedule = function() {
		console.log('show schedule for '+ $scope.selectedGroup +' group');

		group = $scope.selectedGroup;

		$http.get(API.GET.GROUPSCHEDULE + '?groupId=' + group).success(function(data) {
			$scope.schedule = data;
		});

		$scope.show = true;
	}

}]);

var grsuApp = angular.module('grsuApp', [
  'ngRoute',
  'grsuControllers'
]);

grsuApp.constant('API', (function() {

	var resource = 'http://api.grsu.by/1.x/app1';

	return {
		ROOT: resource,
		GET: {
			FACULTIES: resource + '/getFaculties',
			DEPARTMENTS: resource + '/getDepartments',
			GROUPS: resource + '/getGroups',
			GROUPSCHEDULE: resource + '/getGroupSchedule',
			TEACHERS: resource + '/getTeachers?extended=true'
		},
		BASIC_INFO: resource + '/api/info'
	}
})());

grsuApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
	when('/teachers', {
		templateUrl: 'partials/teachers.html',
		controller: 'TeachersCtrl',
		title: 'Преподаватели'
	}).
	when('/schedule', {
		templateUrl: 'partials/schedule.html',
		controller: 'ScheduleCtrl',
		title: 'Расписание'
	}).
	otherwise({
		redirectTo: '/teachers'
	});
}]);

grsuApp.run(['$rootScope',
	function($rootScope) {
	$rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
		$rootScope.title = currentRoute.title;
	});
}]);