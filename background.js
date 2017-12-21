

var SESN = null;

var onBeforeSendHeaders_callback = function(details) {


   if(details.url.indexOf("Rate.aspx")!= -1) return;
   console.log(details.url)

  if(details.url == "https://dev-trade.sbifxt.co.jp/web/pc/Home/ImportantInfo"){

  if(details.url == "https://dev-trade.sbifxt.co.jp/web/pc/Home/Login"){
    
  }

    var cookieStr = ""
    for(var v in details.requestHeaders){
      if(details.requestHeaders[v]["name"] == "Cookie"){
        cookieStr = details.requestHeaders[v]["value"]
      }
    }
    var pArr = cookieStr.split(";")
    var pmap = {}
    for (var v = 0; v < pArr.length; v++) {
      var pair = pArr[v]
      pmap[pair.split("=")[0].replace(" ", "")] = pair.split("=")[1].replace(" ", "");
    }
    SESN = pmap.SESN

  }

  if(pmap.SESN) return;

  if (details.url.indexOf("RefPositionSummaryList") > -1 ) {

    var url = details.url;
    var paramStr = url.substr(url.indexOf("?"))
    var pArr= paramStr.split("&")

    var pmap = {}
    for (var v =0 ;v <  pArr.length; v++){
        var pair = pArr[v]
        pmap[pair.split("=")[0]] = pair.split("=")[1];
    }

    SESN = pmap.SESN
    
  }





}

// var valid = false;
// setInterval(function(){
//   valid = isSessionValid();
// }, 5000);


function getValidSession(){

  if(!SESN) return "";
  var valid = isSessionValid(SESN);

  return valid ? SESN : "";

}


var onBeforeSendHeaders_filters = {
  urls: ["<all_urls>"]
}

chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders_callback, onBeforeSendHeaders_filters,['requestHeaders']);


 



function isSessionValid(s){

  var valid = false;
  if(!s) return timeout;

  var cheader = {
    "Accept": "text/plain, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Host": "dev-trade.sbifxt.co.jp",
    "Origin": "http://localhost:8080",
    "Pragma": "no-cache",
    "Referer": "http://localhost:8080/sbilm-fx-web/index.jsp",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36"
  }

  var data = {
    "STARTCOUNT": "0",
    "COUNT": "41",
    "STARTTIME": "20150108",
    "CURID": "USDJPY",
    "SESN": s,
    "GUID": "RefOrderList_88ed3955-8b70-6206-40a6-038bef711b23",
    "request": null
  }

  
  $.ajax({
    headers: cheader,
    async: false,
    method: "GET",
    url: "https://dev-trade.sbifxt.co.jp/api_fxt/HttpApi/RefOrderList.aspx",
    data: data,
    complete: function(xhr, textStatus) {
      if (xhr.responseText.indexOf("セッション") == -1) {
        valid = true;
      }
    }

  })

  return valid;
}

// chrome.devtools.network.onRequestFinished.addListener(
//   function(request) {
//     if (request.response.bodySize > 40 * 1024) {
//       chrome.devtools.inspectedWindow.eval(
//         'console.log("Large image: " + unescape("' +
//         escape(request.request.url) + '"))');
//     }
//   });