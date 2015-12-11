angular.module('ggldrive')
.service('GglDrvSvc', ['Setting','$http', '$rootScope',function(Setting,$http,$rootScope){
var that = this;
 //$(document).ready(function(){
  var action;
  if(window.action == 'list'){
    action = that.listFiles;
  } else if(window.action = 'doc'){
    action = that.displayFile;
  }

  var docList = [];

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
      console.log('handleAuthResult');
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
    //console.log('handleAuthClick1');
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
        alert('loadDriveApi-list');
        that.listFiles();
      }
      else (window.action=='doc')
      {
        alert('loadDriveApi-doc');
        that.displayFile();
      }
      
  }

  /**
   * Print files.
   */
  this.listFiles = function() {
    var listD = [];
     var request = gapi.client.request({
        'path': '/drive/v2/files',
        'method': 'GET',
        'params': {'maxResults': '5','q': "mimeType = 'application/vnd.google-apps.document'"}
        });
      //console.log('listFiles');
      request.execute(function(resp) {
        var files = resp.items;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            appendLink(file.id, file.title);
            //alert(files[i].title);

            listD.push({
              id : files[i].id,
              title : files[i].title
            });
          }
        } else {
          appendLink('', 'No files found.');
        }
      });
      //console.log('listFiles-end');
    //console.log(listD.id);
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

      $.ajax({
        url: resp.exportLinks["text/plain"],
        type: "GET",
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', "Bearer "+accessToken);
        },
        success: function( data ) {
          $('#outputDoc').html(data.replace(/\n/g, "<br>"));
        }
      });

    });
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


}]);
