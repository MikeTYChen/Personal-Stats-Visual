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
      datasetFill: false,
      scaleShowHorizontalLines: true
    });
  }])
  .controller("chartController", ['$scope', '$timeout', '$http', function ($scope, $timeout,$http) {
    var howMany = 26; // show only 14 days;
    $scope.pieColors = ["#46BFBD","#2C86E8","#FFC870","#FF5A5E"];
    $http.get('data/data.json').success(function(data) {
      milesData = [];
      timeData = [];
      dateData = [];
      //Get Last Updated Date
      $scope.lastUpdate = data[0].lastUpdate;

      //Parse JSON DATA
      for(var num = 2; num<data.length;num++){
        milesData.push(parseInt(data[num].mile));
        timeData.push(parseInt(data[num].time));
        dateData.push(data[num].date);
      }
      //Data for Line Chart
      var length = milesData.length;
      $scope.lineLabels = dateData.slice(length-howMany, length);
      $scope.lineData = [milesData.slice(length-howMany, length),timeData.slice(length-howMany, length)];
      $scope.series = ['Miles','Minutes'];

      //Data for Pie Chart
      $scope.pieLabels = ['Elliptical','Running','Cycling','Rest'];
      $scope.pieData = [data[1].elliptical,data[1].running,data[1].cycling,data[1].rest];
    });

}]);