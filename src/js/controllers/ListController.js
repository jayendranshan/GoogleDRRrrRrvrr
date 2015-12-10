angular.module('ggldrive')
.controller('ListController',['GglDrvSvc',function(GglDrvSvc){
  var lc = this;
  lc.DocList = [];

  lc.handleAuthClick = function(){

   GglDrvSvc.handleAuthClick();

    //GglDrvSvc.listFile();
    //console.log(auth);
  };

}]);