angular.module('chartCtrl', [])
// Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF5252', '#3df'],

      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
  }])
  .controller("chartController", ['$scope', '$timeout', '$http', function ($scope, $timeout,$http) {
    workoutData = [];
    timeData = [];
    $scope.lastUpdate = "";
    $http.get('data/data.json').success(function(data) {
      tempMiles = [];
      tempTime = [];
      tempDate = [];
      var howMany = 24; // show only 14 days;
      $scope.lastUpdate = data[0].lastUpdate;
      for(var num = 1; num<data.length;num++){
        tempMiles.push(parseInt(data[num].mile));
        tempTime.push(parseInt(data[num].time));
        tempDate.push(data[num].date);
      }
      $scope.phones = data[0];
      workoutData = tempMiles;
      timeData = tempTime;
      $scope.labels = tempDate;
      var length = workoutData.length;
      $scope.labels = tempDate.slice(length-howMany, length);
      $scope.data = [workoutData.slice(length-howMany, length),timeData.slice(length-howMany, length)];
    });
  $scope.series = ['Miles','Minutes'];

}]);