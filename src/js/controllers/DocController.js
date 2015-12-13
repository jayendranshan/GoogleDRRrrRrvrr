
angular.module('ggldrive')
.controller('DocController',['GglDrvSvc','$routeParams','TranslateSvc',function(GglDrvSvc,$routeParams,TranslateSvc){
  var dc = this;

  dc.docContent='';
  dc.zombieDocContent;

 	dc.getDocContent = function(){
  window.action == 'doc'
   dc.docContent = GglDrvSvc.displayFile();	
   console.log(dc.docContent);
   dc.zombieDocContent = TranslateSvc.translate(dc.docContent);
   console.log(dc.zombieDocContent);
};


dc.getDocContentTest = function(){
  window.action == 'doc'
   var docContentTest = GglDrvSvc.displayFileTest('1UROI2T0dqoImxJbCsKDt260dl6T1wnfrTRorxNr2y3Q');	
   return docContentTest;
}

 dc.docCtrl = function()
   {
   	return 'DocController';
   }


}]);