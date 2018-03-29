
// https://dev-trade.sbifxt.co.jp/web/pc/Home
//9972687425 000000 施凱文

// content.js

// sessionShow={}
// if(window.location.href.indexOf("localhost") >-1 && window.location.href.indexOf("sbilm-fx-web")  > -1 ){
// 	setInterval(function(){
// },100000000)
// }


$(function(){
		$("#autoLogin").on("click",function(){
			autoLogin($(this).attr("username"), $(this).attr("password"));
		})
})



function autoLogin(username,password){
	var reqData = {"username": username, "password": password}
	datatube.front.request_getValidSession(function(ses){

			if(ses){
				$.cookie("SESN",ses);
			}
			
			// init();

			// datatube.front.request_callInitInPage()
			
			// code injection
			var yourCustomJavaScriptCode = 'alert("login success...")';
			var script = $("<script>");
			$(script).attr("id", "sbilogin_inject");
			var code = document.createTextNode('(function() {' + yourCustomJavaScriptCode + '})();');
			$(script).append(code)
			$("body").append(script)
	}, reqData);
}



// function doLoginLogic(){

// return ;
// 		datatube.front.request_getSessionStatus($.cookie("SESN"),function(res){
// 		console.log(res)
// 		if(!res){
// 			var msg = "<font size='4'>セッションタイムアウト、もう一度ログインしてください...</font>"
// 			if($("#kdg000dialog").length == 0){
// 				showMsg(msg)
// 			}
// 		}

// 	});

// }


// function showMsg(msg){
// 	return;
// 	if($("#kdg000dialog").length == 0){

// 		dg = $("<div id='kdg000dialog'>").dialog({
// 				title:"message",
// 				width:"20%",
// 				height:"auto",
// 				modal: true,
// 				close:function(){
// 					$(dg).dialog("destroy");
// 				}
// 			})
// 		$(dg).html(msg)
// 	}else{
// 		$(dg).html(msg)
// 	}

// }


