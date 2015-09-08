angular.module('teachers', [])

// create our main controller and get access to firebase
.controller('mainController', ['$scope', '$http', function($scope, $http) {
  
  // our application code will go here
	$http.get('http://api.grsu.by/1.x/app1/getTeachers?extended=true').
		then(function(response) {
			$scope.teachers = response.data.items
			console.log($scope.teachers)
	}, function(response) {
	});
  
}]);