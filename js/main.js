

//auto change picture on page1 & click function
$(function(){

	// auto change page1 images
    let timer = setInterval(autoChangePages,3000)
    const $imgList = $("#page1 .backgroundImgList li")
	$("#page1 .pageList div").click(function(){

		//the index of clicked item
    let indexOder = $("#page1 .pageList div").index($(this))
		clearInterval(timer)
    $(this).addClass('current').siblings('.current').removeClass('current')
    $imgList.eq(indexOder).addClass('current').siblings('.current').removeClass('current')
	  timer = setInterval(autoChangePages,3000)
	})

	$("#page1>.left").click(function(){

	   // stop timer when clicking the button
	   clearInterval(timer)
     changeToPreviousPage()
     timer = setInterval(autoChangePages,3000)
	})

  $("#page1>.right").click(function(){
       clearInterval(timer)
       changeToNextPage()
       timer = setInterval(autoChangePages,3000)
	})
  
  $(window).scroll(function(){
    let scrollVal = $(this).scrollTop()
    let speed = 50
    if( scrollVal >= 500 ) {
       $("#page2>.itemList>.item").each(function(){
          $(this).fadeIn(speed)
          speed+=1000
       })
    }
  })

function autoChangePages(){	
   const $currentItem = $('#page1 .pageList .current')
   let index = $currentItem.index()
   index = (index === 5)? 0 :  index + 1
   action(index)
}

function changeToNextPage(){	
   const $currentItem = $('#page1 .pageList .current')
   let index = $currentItem.index()
   index = (index === 5)? 0 :  index + 1
   action(index)
}

function changeToPreviousPage(){
   const $currentItem = $('#page1 .pageList .current')
   let index = $currentItem.index()
   index = (index === 0)? 5 :  index - 1
   action(index)
}

function action(index){
   const $allItems = $("#page1 .pageList div")
   $allItems.eq(index).addClass('current').siblings('.current').removeClass('current')
   $imgList.eq(index).addClass('current').siblings('.current').removeClass('current')	
}
})

//login part
$(function(){
  let loginBoxOn = false
  $("#page1,#page2,#page3").click(function(){
    if(loginBoxOn) {
      $(".login").css({"display":"none"})
      $("#page1,#page2,#page3").css({"-webkit-filter":"brightness(1)"})
    }
  })
  $(".infoRight .loginBox").click(function(){
       $(".login").css({"display":"initial"})
       $("#page1,#page2,#page3").css({"-webkit-filter":"brightness(.3)"})
       loginBoxOn = ($(".login").css("display") === "block") ? true : false
    })
})

//login check
$(function(){
  let fb_google_loginOn = false
  let errortype = 'invalid'
  $(".login>.userInfo>.loginButton").click(function(){
     const mail =  $(".login >.userInfo > input[type=text]").val() || ''
     const password = $(".login > .userInfo > input[type=password]").val() || ''
       if ( mail === '' || password === '') {
          const $span = $(".userInfo").find('.error')
          if( $span.length === 0 || errortype === 'noexist') {
               $span.remove()
               $(".login > .userInfo > input[type=password]").after(
                   '<span style = "color:red;" class = "error">email or password is invalid</span>'
                  )
             }
       }else{
          const $span = $(".userInfo").find('.error')
          const $text = $(".login >.userInfo > input[type=text]")
          const $password = $(".login > .userInfo > input[type=password]")
          if( $span.length !== 0 ) {
            $span.remove()
            $(".login > .userInfo > input[type=password]").after(
                   '<span style = "color:red;" class = "error">this account does not exist</span>'
                  )
          }else{
            $(".login > .userInfo > input[type=password]").after(
                   '<span style = "color:red;" class = "error">this account does not exist</span>'
                  )
          }
          errortype = 'noexist'
          $text.val('')
          $password.val('')
       }
  })

  //login with fb
  $(".login .fb input").click(function(){
      const fbInfo = '<div class = "loginInfo fb">'+
                     '<header class = "fb"></header>'+
                     '<div>'+
                     '<img src = "images/fb_profile.JPG">'+
                     '<p>Hi Mark, we will receive your all private information and only use these as commercial purpose.</p>'+
                     '</div>'+
                     '<input type = "submit" value = "confirm" onclick = "confirmAction()">'+
                     '</div>'
      $("body").append(fbInfo)
      fb_google_loginOn = true
  })

  //login with google
  $(".login .google input").click(function(){
      const googleInfo = '<div class = "loginInfo google">'+
                     '<header class = "google"></header>'+
                     '<div>'+
                     '<img src = "images/google_profile.JPG">'+
                     '<p>Hi android, we will receive your all private information and only use these as commercial purpose.</p>'+
                     '</div>'+
                     '<input type = "submit" value = "confirm" onclick = "confirmAction(this)">'+
                     '</div>'
      $("body").append(googleInfo)
      fb_google_loginOn = true
  })
})

$(function(){
  $("header > .infoRight > .userProfile ").hover(function(){
      const className = $(this).attr('class').split(' ')[1]
      const content = '<div class = "userHoverInfo">'+
                      '<ul>'+
                      '<li>個人資料</li>'+
                      '<li>消費紀錄</li>'+
                      '<li>個人專案</li>'+
                      '<li onclick = "logOut()">登出</li>'+
                      '</ul>'+
                      '</div>'                  
      $("body").append(content)
  },function(){
      $("div.userHoverInfo").hover(function(){
          
      },function(){
           $("div.userHoverInfo").remove()
      })    
  })
})

//after click the confirm button in the login profile page
function confirmAction(e){
   const loginType = $('.loginInfo > header').prop('className')
   console.log(loginType)
   /*const imgCss = 'margin-left:39px;'+
                  'border:solid 0.2px #CCCBCA;'+
                  'float:left;'+
                  'width:40px;'+
                  'height:40px;'*/
   $('.loginInfo').remove()
   $(".login").css({"display":"none"})
   $("#page1,#page2,#page3").css({"-webkit-filter":"brightness(1)"})
   $('header > .infoRight > a').css({"display":"none"})
   $('header > .infoRight > .userProfile').addClass(''+loginType+'').attr("src",'images/'+loginType+'_profile.JPG')
   $('header > .infoRight > .userProfile').css({"display":"initial"})
   //append('<img class = "'+loginType+'" src = "images/'+loginType+'_profile.JPG" style = "'+imgCss+'">')
}

function logOut(){
    $("div.userHoverInfo").remove()
    $('header > .infoRight > .userProfile').css({"display":"none"})
    $('header > .infoRight > a').css({"display":"initial"})

}