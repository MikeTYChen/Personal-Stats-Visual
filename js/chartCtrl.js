angular.module('chartCtrl', [])
// Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#FF8A80'],

      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }])
  .controller("chartController", ['$scope', '$timeout', '$http', function ($scope, $timeout,$http) {
    workoutData = [];
    $http.get('data/data.json').success(function(data) {
      tempMiles = [];
      tempDate = [];
      var howMany = 24; // show only 14 days;
      for(var num = 0; num<data.length;num++){
        tempMiles.push(parseInt(data[num].mile));
        tempDate.push(data[num].date);
      }
      $scope.phones = data[0];
      workoutData = tempMiles;
      $scope.labels = tempDate;
      var length = workoutData.length;
      $scope.labels = tempDate.slice(length-howMany, length);
      $scope.data = [workoutData.slice(length-howMany, length)];
    });
  $scope.series = ['Workouts'];

}]);