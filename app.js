angular.module('teachers', [])

// create our main controller and get access to firebase
.controller('mainController', ['$scope', '$http', function($scope, $http) {
  
  // our application code will go here
	$http.get('teachers.json').
		then(function(response) {
			$scope.teachers = response.data.items
			console.log($scope.teachers)
	}, function(response) {
	});
  
}]);