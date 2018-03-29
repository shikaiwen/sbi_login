

var SESN = null;

var onBeforeSendHeaders_callback = function(details) {


   // if(details.url.indexOf("Rate.aspx")!= -1) return;
   // console.log(details.url)


  if(details.url == "https://dev-trade.sbifxt.co.jp/web/pc/Home/Login"){
    
  }


  var pmap = {}

  if (details.url == "https://dev-trade.sbifxt.co.jp/web/pc/Home/ImportantInfo") {

    var cookieStr = "";

    for (var v in details.requestHeaders) {
      if (details.requestHeaders[v]["name"] == "Cookie") {
        cookieStr = details.requestHeaders[v]["value"]
      }
    }

    var pArr = cookieStr.split(";")
    
    for (var v = 0; v < pArr.length; v++) {
      var pair = pArr[v]
      pmap[pair.split("=")[0].replace(" ", "")] = pair.split("=")[1].replace(" ", "");
    }

    SESN = pmap.SESN

    if(validSessionWaiter){
      validSessionWaiter(SESN)
    }

  }


  if (details.url.indexOf("RefPositionSummaryList") > -1 ) {
    var url = details.url;
    var paramStr = url.substr(url.indexOf("?"))
    var pArr= paramStr.split("&")
    for (var v =0 ;v <  pArr.length; v++){
        var pair = pArr[v]
        pmap[pair.split("=")[0]] = pair.split("=")[1];
    }
    SESN = pmap.SESN
  }



}



var validSessionWaiter = null;

function getValidSession(callback, username,password){

  
  // var valid = isSessionValid(SESN);
  // if(valid){
  //   callback(SESN)
  //   return;
  // }


  if(callback){
    validSessionWaiter = callback  
  }
  
  login(username,password);

}


var onBeforeSendHeaders_filters = {
  urls: ["<all_urls>"]
}

chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders_callback, onBeforeSendHeaders_filters,['requestHeaders']);

 


function isSessionValid(s){

  var valid = false;
  if(!s) return valid;

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


function login(username,password){

//   var headers = {
// "Pragma":"no-cache",
// "Origin": "http://localhost:8080",
// "Accept-Encoding":"gzip, deflate, br",
// "Host":"dev-trade.sbifxt.co.jp",
// "Accept-Language":"en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6",
// "Upgrade-Insecure-Requests":"1",
// "User-Agent":"Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
// "Content-Type":"application/x-www-form-urlencoded",
// "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
// "Cache-Control":"no-cache",
// // "Access-Control-Allow-Origin":"*",
// "Referer":"https://dev-www.sbifxt.co.jp/login.html",
// "Connection":"keep-alive"
//   }

var headers = {
  "Content-Type": "application/x-www-form-urlencoded",
}

  var mydata = {"ID": username, "PASS": password, "GUID": "12345"}

  $.ajax({
    headers: headers,
    async: true,
    method: "POST",
    url: "https://dev-trade.sbifxt.co.jp/web/pc/Home/Login",
    data: mydata,//"ID=9972687425&PASS=000000&GUID=12345",
    complete: function(xhr, textStatus) {

      if(xhr.status != 200){
          // console.log(xhr.getAllResponseHeaders())
      }

      // if (xhr.responseText.indexOf("セッション") == -1) {
      //   valid = true;
      // }


    }

  })

}