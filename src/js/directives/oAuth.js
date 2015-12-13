
angular.module('ggldrive')
.directive("dirOATH",['GglDrvSvc', function($compile,GglDrvSvc){
	return function(scope, element, attrs){
		element.bind("click", function(){
			 var result = function(){
			  window.action == 'list'
			  GglDrvSvc.handleAuthClick();
			  };
		});
	};
}]);
