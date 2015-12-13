angular.module('ggldrive')
.service('TranslateSvc', ['Setting','$http',function(Setting,$http){

	var that = this;
	var translatedText;;
	that.translate = function(text) {
	var textSample = 'Aliquando scriptorem sit ut, persius fuisset moderatius vix no. Ea ius convenire salutandi, partem invidunt indoctum duo ei. Mea ut eirmod maiorum, ne quod tollit lobortis sea. Usu ad justo tibique. Ius mollis veritus invidunt an, cu per veritus assentior definitiones.';
    $http.get('http://ancient-anchorage-9224.herokuapp.com/zombify?q='+textSample)
      .then(function(response){
       var translatedTest= response.data;
       console.log(translatedTest);
       return translatedText;
      });
    
  }
}]);