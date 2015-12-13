angular.module('ggldrive')
.controller('ListController',['GglDrvSvc','$q','$rootScope','$scope',function(GglDrvSvc,$q,$rootScope,$scope){
  var lc = this;
  lc.Documents = [];
  

  lc.handleAuthClick = function(){
  window.action == 'list'
  var result = GglDrvSvc.handleAuthClick();
  console.log(result);
  };

  lc.Documents.push({
 			id : '1UROI2T0dqoImxJbCsKDt260dl6T1wnfrTRorxNr2y3Q',
 			title : 'Document1',
 		});
  lc.Documents.push({
 			id : '1MCAJu8BBeV1k4DiHDWtgEXb-eEvU0OyY-tqV7h27c1c',
 			title : 'Document2',
 		});
//console.log(lc.Documents);


lc.geDoc = function(id){
  window.action == 'doc'
  window.checkAuth();
  //GglDrvSvc.displayFile(id);
  console.log(window.action);
  };

  lc.handleAuthClickTest = function(){
  window.action == 'list'
  var result = GglDrvSvc.handleAuthClick();
  return result;
  };

  lc.lstCtrl = function()
   {
   	return 'ListController';
   }


}]);