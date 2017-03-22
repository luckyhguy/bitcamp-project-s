$(function() {
	/*   header 호출 스크립트 및 로그인 유저 로그인 상태 확인.   */
	var memberNo = 0;
	var date = new Date();
	var photoPath;
	$.get(clientRoot + '/common/header.html', function(result) {
		console.log("header 호출");
		  $.getJSON(serverRoot + '/auth/loginUser.json', function(ajaxResult) {
				$('#header').html(result);
					if (ajaxResult.status == "fail") { // 로그인 되지 않았으면,
						$('.header-icon-power').css("display", "inline-block");
						return;
					} else {
						$('.header-icon-user').css("display", "inline-block");
						$('.header-icon-message').css("display", "inline-block");
					}
				
				console.log(ajaxResult.data.memberNo);
				console.log(ajaxResult.data.photoPath);
				
				memberNo = ajaxResult.data.memberNo;
				// 로그인 되었으면
				
				$('.profile-img').attr('src', clientRoot + '/mystuff/img/' + ajaxResult.data.photoPath);
				$('.user-info h3').text(ajaxResult.data.name);
				
				// 파일 업로드
				$('#photo').fileupload({
				    url: serverRoot + '/common/fileupload.json', // 서버에 요청할 URL
				    dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
				    sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
				    singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기. 기본은 true.
				    autoUpload: true,        // 파일을 추가할 때 자동 업로딩 여부 설정. 기본은 true.
				    disableImageResize: /Android(?!.*Chrome)|Opera/
				        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
				    previewMaxWidth: 800,   // 미리보기 이미지 너비
				    previewMaxHeight: 800,  // 미리보기 이미지 높이 
				    previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
				    done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
//				    	console.log('done()...');
//				    	console.log(data.result.data[0]);
				       photoPath = data.result.data[0];
//				        $('#photo-path').val(data.result);
				       console.log("하하하하");
				       console.log(data.result.data[0]);
				        
					
					    	var param = {
					    			"memberNo": memberNo,
					    			"name": $('.user-info h3').val(),
					    			"photoPath": photoPath
					    	};
					    
						    $.post(serverRoot + '/mentee/update.json', param, function(ajaxResult) {
						    	if (ajaxResult.status != "success") {
						    		console.log("업데이트안됨.");
						    		alert(ajaxResult.data);
						    		return;
						    	}
						    	console.log("파일업로드!");
						    	console.log(ajaxResult.data);
						    	photoPath = ajaxResult.data.photoPath

						    	console.log(date.getTime())
						    	console.log(location.href); 
						    	
						    	refresh();			    		
						    	function refresh() {
						  		  $.ajax({
						                type: 'POST',
						                url: 'http://localhost:8080/bitcamp-project-s/mystuff/homepage.html', 
						                success: function(msg) {
						                	$('.profile-img').removeAttr('src').attr('src', clientRoot + '/mystuff/img/' + photoPath);
						                }
						            });
						  		} 
						    		

							    	
						    }, 'json'); // 새 파일 업로드 post 요청. update 요청.
						    
						    
				        
				    } // 사진 새로 바꿨을 때 호출되는 함수.
				});
				
				
			  }); // loginUser
	});
	/*   /header 호출 스크립트 및 로그인 유저 로그인 상태 확인.   */
	
	/*   header toggle menu event   */
	  var isopen_usermenu = false;
	  var isopen_messagemenu = false;
	  
	  $(document.body).on("click", function(e) {
	    var target = $(e.target); 
	    console.log(target);
	    if (target.hasClass('cont')) {
	    	$('.demo').removeClass("animated fadeInRight");
	    	$('.demo').addClass("animated fadeOutRight");
	    	setTimeout(function() {
	    		$('.auth-login-form').css("display", "none");
	    		$('.demo').removeClass("animated fadeOutRight");
	    	}, 600);
	    }
	    if (!target.parents().hasClass("header-icons")) {
	      $(".user-menu").hide();
	      $(".message-menu").hide();
		  isopen_usermenu = false;
		  isopen_messagemenu = false;
	    } else {
	      if (target.hasClass("header-icon-user")) {
	        if (!isopen_usermenu) {
	        $(".message-menu").hide();
	        $(".user-menu").show();
	        isopen_usermenu = true;
            isopen_messagemenu = false;
	      } else {
	            $(".user-menu").hide();
	            isopen_usermenu = false;
	          }
	      }
	      if (target.hasClass("header-icon-message")) {
	        if (!isopen_messagemenu) {
	        $(".user-menu").hide();
	        $(".message-menu").show();
	        isopen_messagemenu = true;
	        isopen_usermenu = false;
	        } else {
	            $(".message-menu").hide();
	            isopen_messagemenu = false;
	        }
	      }
	      if (target.hasClass("header-icon-power")) {
				$('.auth-login-form').load(clientRoot + "/auth/login.html .cont", function() {
					$('.auth-login-form').css("display", "block");
					$('.demo').addClass("animated fadeInRight");
					});
	      }
	      if (target.parents().hasClass("menu-nav")) {
			$.getJSON(serverRoot + '/auth/logout.json', function(ajaxResult) {
		    	$('.header-icon-power').css("display", "inline-block");
		    	$('.header-icon-user').css("display", "none");
		    	$('.header-icon-message').css("display", "none");
				  $(".user-menu").hide();
				  $(".message-menu").hide();
				  isopen_usermenu = false;
				  isopen_messagemenu = false;
			});
	      }
	    }
	  });
	/*   /header toggle menu event   */
	
	/*   Cookie 관리 스크립트   */
	function getCookie(cname) {
	    var name = cname + "=";
	    var decodedCookie = decodeURIComponent(document.cookie);
	    var ca = decodedCookie.split(';');
	    for(var i = 0; i <ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}

	function setCookie(cname, cvalue, exdays, path) {
		if (path == undefined) {
			path = "/";
		}
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+ d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
	}
	/*   /Cookie 관리 스크립트   */
	
	/*   window 사이즈 구하기   */
	$(window).ready(function() {
		var windowWidth = $(window).width();
		var windowHeigth = $(window).height();
		
		$(window).resize(function() {
			windowWidth = $(window).width();
			windowHeigth = $(window).height();
			
			/*$(".main-frame").css("height", windowHeigth + "px");*/
		});
			
		/*$(".main-frame").css("height", windowHeigth + "px");*/
	});
	/*   /window 사이즈 구하기   */
});
