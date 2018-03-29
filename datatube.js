
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

	datatube.front.request_getValidSession = function(callback,data) {

		datatube.front.callback_getValidSession = callback;
		chrome.runtime.sendMessage({
			"key": "getValidSession",
			"val":data
		});

	}


	// invoke background method 
	datatube.front.request_invokeBackgroundFun = function(arguments,callback) {

		datatube.front.request_invokeBackgroundFun = callback;
		chrome.runtime.sendMessage({
			"key": "invokeBackgroundFun",
			"val": arguments
		});


	}


	datatube.front.request_callInitInPage = function() {

		chrome.runtime.sendMessage({
			"key": "callInitInPage"
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


		    if( request.key == "returnValidSession" ) {
		    	
		 		var data = request.val;
		 		if(datatube.front.callback_getValidSession){
		 			//callback only if get valid session
		 			if(data){
		 				datatube.front.callback_getValidSession(data);		
		 			}
		 			
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

	datatube.backend.handle_getValidSession = function(reqData){

		var result = getValidSession(function(validSession){

			// call the contentScript
			var resultData = {}
		  	resultData["key"] = "returnValidSession";
		  	resultData["val"] = validSession;
			sendToActiveTab(resultData);

		},reqData["username"], reqData["password"]);
		
		// return result ?  result : "";
	}

	datatube.backend.handle_invokeBackgroundFun = function(arguments){

		window[arguments[0]](Array.prototype.slice.call(arguments,1))

		return data;
	}

	// backend
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {

	  	var resultData = {}
	  	resultData["key"] = request.key;

	    if( request.key == "getSessionStatus" ) {

	 		var data = datatube.backend.handle_getSessionStatus(request.val);
	 		resultData.val = data;
	 		sendToActiveTab(resultData);
	    }


	    if( request.key == "getValidSession" ) {

	 		var data = datatube.backend.handle_getValidSession(request.val);
	    }


	    if( request.key == "invokeBackgroundFun" ) {

	 		var data = datatube.backend.handle_invokeBackgroundFun(request.val);
	 		// resultData.val = data;
			// sendToActiveTab(resultData);
	    }

	    if(request.key == "callInitInPage")

			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function(tabs) {
				// var activeTab = tabs[0];
				// chrome.tabs.sendMessage(activeTab.id, data);
				
				chrome.tabs.executeScript(tabs[0], {
				code: "alert('aaa'); init();"
			});
			});





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






