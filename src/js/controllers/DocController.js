
angular.module('ggldrive')
.controller('DocController',['GglDrvSvc','$routeParams',function(GglDrvSvc,$routeParams){
  var dc = this;

  dc.DocList = [];

 lc.handleAuthClick = function(){
  window.action == 'doc'
   GglDrvSvc.handleAuthClick();
  console.log($routeParams.id);
};

}]);