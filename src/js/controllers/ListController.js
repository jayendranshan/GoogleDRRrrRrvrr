angular.module('ggldrive')
.controller('ListController',['GglDrvSvc',function(GglDrvSvc){
  var lc = this;
  lc.DocList = [];

  lc.handleAuthClick = function(){
  window.action == 'list'
   GglDrvSvc.handleAuthClick();

  };

}]);