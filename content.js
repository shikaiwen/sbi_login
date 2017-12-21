
// https://dev-trade.sbifxt.co.jp/web/pc/Home
//9972687425 000000 施凱文

// content.js


sessionShow={}
if(window.location.href.indexOf("localhost") > -1){

	setInterval(function(){

	datatube.front.request_getSessionStatus($.cookie("SESN"),function(res){
		console.log(res)


		if(!res){

			var msg = "<font size='4'>セッションタイムアウト、もう一度ログインしてください...</font>"

			if($("#kdg000dialog").length == 0){
				showMsg(msg)
			}
			


			datatube.front.request_getValidSession(function(ses){
				
				if(ses){
					$.cookie("SESN",ses);
					showMsg("<font size='4'>セッション再設置完了、画面の更新必要がない</font>")
					// sessionShow[ses] = 0;
					// if(!sessionShow[$.cookie("SESN")]){
					// }
				}

			});

		}






	});

},1000)

}


function showMsg(msg){

	if($("#kdg000dialog").length == 0){

		dg = $("<div id='kdg000dialog'>").dialog({
				title:"message",
				width:"20%",
				height:"auto",
				modal: true,
				close:function(){
					$(dg).dialog("destroy");
				}
			})
		$(dg).html(msg)
	}else{
		$(dg).html(msg)
	}

}



