

//detail documentation: https://developer.chrome.com/extensions/devtools
// debug devtools page. detached debug mode -> ctrl+shift+i


chrome.devtools.network.onRequestFinished.addListener(
  function(request) {


  	console.log(request.request.url)


  	if(request.request.url.indexOf("Home/Login") > -1){

  		  request.getContent(function(content, encoding){
  		  	var url = request.request.url
  			console.log(content)
  		});
  	}
    // if (request.response.bodySize > 40*1024) {
    //   chrome.devtools.inspectedWindow.eval(
    //       'console.log("Large image: " + unescape("' +
    //       escape(request.request.url) + '"))');
    // }


});
      