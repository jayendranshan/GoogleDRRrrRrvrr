angular.module('ggldrive')
.controller('DocController',['GglDrvSvc','$scope',function(GglDrvSvc,$scope){
  var dc = this;

  dc.DocList = [];

  dc.handleAuthClick = function(){

    GglDrvSvc.handleAuthClick();

    //dc.DocList = localStorage.getItem("DocList");
    //console.log(dc.DocList);
};

}]);