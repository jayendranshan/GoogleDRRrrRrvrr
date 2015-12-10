angular.module('ggldrive', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/list', {
    templateUrl: 'templates/list.html',
    controller: 'ListController',
    controllerAs: 'lc'
  })
  .when('/doc', {
    templateUrl: 'templates/doc.html',
    controller: 'DocController',
    controllerAs: 'dc'
  })
  .otherwise({
   redirectTo: 'list'
  });


}]);

