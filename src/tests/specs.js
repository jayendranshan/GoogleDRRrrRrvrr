describe('ListController', function(){
  var listController, scope;
  beforeEach(angular.mock.module('ggldrive'));
  beforeEach(angular.mock.inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    listController = $controller('ListController', {$scope: scope});
  }));

  it('Authentication should succeed', function(){
    expect(listController.lstCtrl()).toBe('ListController');
    
  });
    
 });

describe('DocController', function(){
  var docController, scope;
  beforeEach(angular.mock.module('ggldrive'));
  beforeEach(angular.mock.inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    docController = $controller('DocController', {$scope: scope});
  }));

  it('Document returns content', function(){
    expect(docController.docCtrl()).toBe('DocController');
    
  });
    
 });

describe('TranslateSvc', function(){
  var translateSrv;
  beforeEach(module('ggldrive'));
    inject(function($injector) {
      translateSrv = $injector.get('GglDrvSvc');
    });

   describe('TranslateText', function(){
    it("Should translate text", function(){
      expect(translateSrv.translate('test')).toBe('trrst');
    });
  });

});