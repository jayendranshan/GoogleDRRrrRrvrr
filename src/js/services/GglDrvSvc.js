angular.module('ggldrive')
.service('GglDrvSvc', ['Setting','$http', '$rootScope','$q',function(Setting,$http,$rootScope,$q){


var that = this;
 //$(document).ready(function(){
  var action;
  if(window.action == 'list'){
    action = that.listFiles;
  } else if(window.action = 'doc'){
    action = that.displayFile;
  }

  var docList = [];
 var data;

  /*this.login = function () {
    var deferred = $q.defer();
    gapi.auth.authorize({ 
    client_id: CLIENT_ID, 
    scope: SCOPES, 
    immediate: false//, 
    //hd: domain 
    }, this.handleAuthResultListFiles );
return deferred.promise;
}

this.handleAuthResultListFiles = function(authResult) {
  if (authResult && !authResult.error) {
    var deferred = $q.defer();
    var data;
    gapi.client.load('drive', 'v2', function () {
    var request = gapi.client.drive.files.list({
    'maxResults': 10,
    'q': "mimeType = 'application/vnd.google-apps.document'"
    });// gapi.client.oauth2.userinfo.get();

    request.execute(function (resp) {
        deferred.resolve(resp.items);
        data = resp.items;
        $rootScope.listItems = resp.items;
        //console.log(data);
      });
    });
    } 
  else {
    deferred.reject('error');
    }
};*/

  /**
   * Check if current user has authorized this application.
   */
  window.checkAuth = function() {
    gapi.auth.authorize(
      {
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
      }, this.handleAuthResult);
  };

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  this.handleAuthResult = function(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      loadDriveApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  }

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  this.handleAuthClick = function(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      this.handleAuthResult);
    return false;
  }

  /**
   * Load Drive API client library.
   */
  function loadDriveApi() {
      gapi.client.load('drive', 'v2',null);
      if(window.action=='list')
      {
        that.listFiles();
      }
      else (window.action=='doc')
      {
        that.displayFile();
      }
      
  }

  /**
   * Print files.
   */
  this.listFiles = function() {

     var request = gapi.client.request({
        'path': '/drive/v2/files',
        'method': 'GET',
        'params': {'maxResults': '5','q': "mimeType = 'application/vnd.google-apps.document'"}
        });
      request.execute(function(resp) {
        var files = resp.items;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log(file);
            appendLink(file.id, file.title);
          }
        } else {
          appendLink('', 'No files found.');
        }
      });
  }

  this.displayFile = function () {
    fileId = window.location.hash.substring(1);
    
    //var request = gapi.client.drive.files.get({fileId: fileId});
    var request = gapi.client.request({
        'path': '/drive/v2/files/'+fileId,
            'method': 'GET'
        });

    request.execute(function(resp) {
      var accessToken = gapi.auth.getToken().access_token;

      $http.get('https://docs.google.com/feeds/download/documents/export/Export?id='+fileId,
        {
                headers: {Authorization: 'Bearer '+accessToken,'Content-Type': 'text/plain'}
            }
        )//,Content-Type: 'text/plain',Authorization: 'Bearer '+accessToken
      .then(function(response){
        //console.log(response.data);
        data=response.data;
        $('#outputDoc').html(data.replace(/\n/g, "<br>"));
        console.log(data.replace(/\n/g, "<br>"));
        return response.data.replace(/\n/g, "<br>");
      });
    });
    //console.log(data);
    //return data.replace(/\n/g, "<br>");
  }

  /**
   * Append a link element to the body containing the given text
   * and a link to the /doc page.
   *
   * @param {string} id Id to be used in the link's href attribute.
   * @param {string} text Text to be placed in a element.
   */
  function appendLink (id, text){
    if(id != ''){
      var li = $('<li></li>');
      var link = $('<a></a>');
      link.attr('href', '/doc.html#'+id);
      link.html(text);
      li.append(link);
      $('#output ul').append(li);
    } else {
      $('#output').append(text);
    }
    window.action = 'doc';
  }
//});
  //$('#authorize-btn').click(handleAuthClick);

  this.displayFileTest = function (id) {
    var request = gapi.client.request({
        'path': '/drive/v2/files/'+id,
            'method': 'GET'
        });
    request.execute(function(resp) {
      var accessToken = gapi.auth.getToken().access_token;

      $http.get('https://docs.google.com/feeds/download/documents/export/Export?id='+id,
        {
                headers: {Authorization: 'Bearer '+accessToken,'Content-Type': 'text/plain'}
            }
        )
      .then(function(response){
        data=response.data;
        $('#outputDoc').html(data.replace(/\n/g, "<br>"));
        return response.data;
      });
    });
  }



}]);
