
// shortcut :  https://developer.chrome.com/extensions/commands 

datatube = {}

var isBackground = function(){
	return window.location.href.indexOf("chrome-extension://") >= 0
}()


if (!isBackground) {
	
	datatube.front = {}
	datatube.front.request_getSessionStatus = function(SENS,callback) {

		datatube.front.callback_getSessionStatus = callback;

		chrome.runtime.sendMessage({
			"key": "getSessionStatus",
			"val":SENS
		});


	}

	datatube.front.request_getValidSession = function(callback) {

		datatube.front.callback_getValidSession = callback;
		chrome.runtime.sendMessage({
			"key": "getValidSession"
		});


	}


	//font end
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {


			if( request.key == "getSessionStatus" ) {
		    	
		 		var data = request.val;
		 		if(datatube.front.callback_getSessionStatus){
		 			datatube.front.callback_getSessionStatus(data);	
		 		}
		 		
		    }

		    if( request.key == "getValidSession" ) {
		    	
		 		var data = request.val;
		 		if(datatube.front.callback_getValidSession){
		 			datatube.front.callback_getValidSession(data);	
		 		}
		 		
		    }



		}
	);

}else{


	datatube.backend = {}
	datatube.backend.handle_getSessionStatus = function(sens){
		// chrome.tabs.create({"url": url});
		//chrome.tabs.create({'url': "/options.html" } )
		var result = isSessionValid(sens)
		// chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
		return result;
	}

	datatube.backend.handle_getValidSession = function(url){
		var result = getValidSession();
		return result;
	}

	// backend
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {

	  	var resultData = {}
	  	resultData["key"] = request.key;
	  	resultData["val"] = {}

	    if( request.key == "getSessionStatus" ) {

	 		var data = datatube.backend.handle_getSessionStatus(request.val);
	 		resultData.val = data;
	 		sendToActiveTab(resultData);
	    }


	    if( request.key == "getValidSession" ) {

	 		var data = datatube.backend.handle_getValidSession();
	 		resultData.val = data;
			sendToActiveTab(resultData);
	    }


	  }
	);



	function sendToActiveTab(data) {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs) {
			var activeTab = tabs[0];
			chrome.tabs.sendMessage(activeTab.id, data);
		});

	}


}






