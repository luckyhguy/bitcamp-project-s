
$(function() {
	
	$(document.body).on( "click", "#likes-btn, .mento-like-btn", function() {
		var currPageNo = 1;
		var pageSize = 4;
		var sno = 5;
		$(".likes").load("likes/mento-like.html .dashboard", function() {
			likeMentoList(currPageNo, pageSize, sno);
		});

		$('#prevPgBtn').click(function() {
			if (currPageNo > 1) {
				likeMentoList(--currPageNo, 4, sno);
			}
		});

		$('#nextPgBtn').click(function() {
			likeMentoList(++currPageNo, 4, sno);
		});

		function mentoLikePreparePagingButton(totalCount) {
			// 현재 페이지 번호가 1이면 이전 버튼을 비활성시킨다.
			if (currPageNo <= 1) {
				$('#prevPgBtn').attr('disabled', true);
			} else {
				$('#prevPgBtn').attr('disabled', false);
			}

			var maxPageNo = parseInt(totalCount / pageSize);
			if ((totalCount % pageSize) > 0) {
				maxPageNo++;
			}

			if (currPageNo >= maxPageNo) {
				$('#nextPgBtn').attr('disabled', true); 
			} else {
				$('#nextPgBtn').attr('disabled', false);
			}

			// 현재 페이지 번호를 출력한다.
			$('#pageNo').text(currPageNo);
		}
		function likeMentoList(pageNo, pageSize, sno) {
			console.log("dasdsajcjcjcjc");
			$.getJSON(serverRoot + '/mentoLike/list.json', 
					{
				"pageNo": pageNo,
				"pageSize": pageSize,
				"sno": sno
					}, 
					function(ajaxResult) {
						var status = ajaxResult.status;
						if (status != "success")
							return;

						var list = ajaxResult.data.list;
						console.log(list);

						var section = $('.mento-like-list');

						var template = Handlebars.compile($('#mentoLike').html());
						section.html(template({"list": list}));

						mtHover();
						mentoLikePreparePagingButton(ajaxResult.data.totalCount);
						console.log(ajaxResult.data.totalCount);
						
						
					});  
		}
	}); // 헤더 likes 버튼 및 멘토&설계도  클릭시 이벤트
	
	
	// 좋아하는 영상 클릭시.
	$(document.body).on( "click", ".video-like-btn", function() {
		var currPageNo = 1;
		var pageSize = 15;
		var sno = 5;
		$(".likes").load("likes/video-like.html .dashboard", function() {
			likeVideoList(currPageNo, pageSize, sno);
		});

		$('#prevPgBtn').click(function() {
			if (currPageNo > 1) {
				likeVideoList(--currPageNo, 15, sno);
			}
		});

		$('#nextPgBtn').click(function() {
			likeVideoList(++currPageNo, 15, sno);
		});

		function preparePagingButton(totalCount) {
			// 현재 페이지 번호가 1이면 이전 버튼을 비활성시킨다.
			if (currPageNo <= 1) {
				$('#prevPgBtn').attr('disabled', true);
			} else {
				$('#prevPgBtn').attr('disabled', false);
			}

			var maxPageNo = parseInt(totalCount / pageSize);
			if ((totalCount % pageSize) > 0) {
				maxPageNo++;
			}

			if (currPageNo >= maxPageNo) {
				$('#nextPgBtn').attr('disabled', true); 
			} else {
				$('#nextPgBtn').attr('disabled', false);
			}

			// 현재 페이지 번호를 출력한다.
			$('#pageNo').text(currPageNo);
		}

		function likeVideoList(pageNo, pageSize, sno) {
			$.getJSON(serverRoot + '/videoLike/list.json', 
					{
				"pageNo": pageNo,
				"pageSize": pageSize,
				"sno": sno
					}, 
					function(ajaxResult) {
						var status = ajaxResult.status;
						if (status != "success")
							return;

						var list = ajaxResult.data.list;
						console.log(list);

						var section = $('.video-like-list');

						var template = Handlebars.compile($('#videoLike').html());
						section.html(template({"list": list}));

						console.log("like");
						console.log(ajaxResult.data.totalCount);
						preparePagingButton(ajaxResult.data.totalCount);
					});  
		}

	}); // 좋아하는 영상 클릭시 이벤트
	
	
	
	
	
});

$(document.body).on( "click", ".side li", function() { 
	
	$(this).addClass('active')
	$(this).siblings().removeClass('active');
	
});

/*$( function() { 

		        // 좋아요 버튼 눌렀을 때
		        
		        $(document.body).on( "click", ".mento-like-list .buttonHolder", function() {// 좋아요 버튼 눌렀을 때
		        	 event.preventDefault();
		        	 var curNo = $(this).attr("data-no");
				        
		        	if($(this).children(".btn").hasClass("checked")) {
		        		$(this).children(".btn").removeClass("checked");
		        		$(this).children(".btn").css("color","black");
		                $.post(serverRoot + '/like/delete.json?curNo=' + curNo, function(ajaxResult) {
				        	  if (ajaxResult.status != "success") {
				    	          alert(ajaxResult.data);
				    	          return;
				    	      }
				        	  console.log("삭제했다.");
				          }, 'json');
		        	} else {
		        		$(this).children(".btn").addClass("checked");
		                $(this).children(".checked").css("color","#f94e66");
				          
		                $.post(serverRoot + '/like/add.json?curNo=' + curNo + '&sno=' + sno, function(ajaxResult) {
				        	  if (ajaxResult.status != "success") {
				    	          alert(ajaxResult.data);
				    	          return;
				    	      }
				        	  console.log("했다.");
				          }, 'json');
		                
		                
		        	}
		        })
		    	
		        
		
		      
		      $('.name-link').click(function(event) {
		        event.preventDefault();
		        location.href = 'view.html?memberNo=' + $(this).attr("data-no");
		      
		      
//		      preparePagingButton(ajaxResult.data.totalCount);
		  });  */
	



function mtHover() { // 설계도 hover 시 bottom 그라디언트 띄우기.
	
$(".mt-list").hover(function(){
    $(this).css("cursor","pointer");
	   $(this).children(".mt-btm").css({"background": "linear-gradient(90deg, rgba(105, 183, 235, 0.35), #b3dbd3, rgba(244, 214, 219, 0.55)"});
	   $(this).children(".mt-btm").children(".mt-name").css("display", "inline-block");
	   $(this).children(".mt-btm").children(".like-mt-photo").css("top", "-50px");
 
})

$(".mt-list").mouseleave(
	    function () {
	     $(this).children(".mt-btm").css("background", "transparent");
 	 $(this).children(".mt-btm").children(".mt-name").css("display", "none");
        $(this).children(".mt-btm").children(".like-mt-photo").css("top", "-15px");
	    }
	  );
}


   
    $(document.body).on( "click", ".rec-btn", function() { // 추천목록 눌렀을 때
    	 
    	$("#rec-list").css("border-bottom", "2px solid blue");
    	$("#like-list").css("border-bottom", "none");
	    	$(".rec-btn").css("text-decoration", "none");
	    $("#all-rec-list").css("display", "block");
        $("#all-like-list").css("display", "none");
//        $(".all-rec-model, .job-all, .all-rec-mento, video-all").css("display", "inline-block");
       
    });

    $(document.body).on( "click", ".like-btn", function() {// 좋아요 목록 눌렀을 때
    	
    	$("#like-list").css("border-bottom", "2px solid blue");
    	$("#rec-list").css("border-bottom", "none");
    	$(".like-btn").css("text-decoration", "none");
	    $("#all-like-list").css("display", "block");
        $("#all-rec-list").css("display", "none");
//        $(".all-rec-model, .job-all, .all-rec-mento, video-all").css("display", "inline-block");
   
    });
    

    $(".hover").mouseleave(
    	    function () {
    	      $(this).removeClass("hover");
    	    }
    	  );
    
    $(".video").hover(function() { // 비디오 hover효과
    	
    	$(".video").css("background-color", "rgba(240, 128, 128, 0.27)");
    	
    })
    
    $(".video").mouseleave(
    	    function () {
    	      $(".video").css("background-color", "transparent");
    	    }
    	  );
    //
    
    
    
    //  추천영상 bottom 허버시 이벤트
    
    $(".videoBox").hover(function(){
    	$(this).children(".video-box").css({"height":"20px", "width":"20px"});
    })
        $(".videoBox").mouseleave(
    	    function () {
    	    	$(this).children(".video-box").css({"height":"0px", "width":"0px"});
    	    }
    	  );
    
    $(".video-box").hover(function(){
    	$(this).css({"height":"50px", "width":"50px"});
    })
        $(".video-box").mouseleave(
    	    function () {
    	      $(this).css({"height":"20px", "width":"20px"});
    	    }
    	  );
    
    
    $(".jobBox").hover(function(){
    	$(this).children(".job-box").css({"height":"20px", "width":"20px"});
    })
        $(".jobBox").mouseleave(
    	    function () {
    	    	$(this).children(".job-box").css({"height":"0px", "width":"0px"});
    	    }
    	  );
    
    $(".job-box").hover(function(){
    	$(this).css({"height":"50px", "width":"50px"});
    })
        $(".job-box").mouseleave(
    	    function () {
    	      $(this).css({"height":"20px", "width":"20px"});
    	    });

    
    

	