angular.module('ggldrive')
.service('GglDrvSvc', ['Setting',function(Setting){

 //$(document).ready(function(){
  var action;
  if(window.action == 'list'){
    action = listFiles;
  } else if(window.action = 'doc'){
    action = displayFile;
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
      }, handleAuthResult);
  };

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  function handleAuthResult(authResult) {
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
  function handleAuthClick(event) {
    console.log('handleAuthClick1');
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult);
    console.log('handleAuthClick2');
    return false;
  }

  /**
   * Load Drive API client library.
   */
  function loadDriveApi() {
    gapi.client.load('drive', 'v2',action);
  }

  /**
   * Print files.
   */
  function listFiles() {
    var request = gapi.client.drive.files.list({
        'maxResults': 10,
        'q': "mimeType = 'application/vnd.google-apps.document'"
      });
      console.log('listFiles');
      request.execute(function(resp) {
        var files = resp.items;
        if (files && files.length > 0) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            appendLink(file.id, file.title);

              docList.push({
              id : file.id,
              title : file.title,
            });
          }
        } else {
          appendLink('', 'No files found.');
          docList.push({
              id : '',
              title : 'No files found.',
            });
        }
      });
      console.log(docList);
  }

  

  function displayFile() {
    fileId = window.location.hash.substring(1);
    //alert(window.action);
    var request = gapi.client.drive.files.get({fileId: fileId});

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
  function appendLink(id, text){
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
