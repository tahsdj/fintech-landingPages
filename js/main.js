(function(){

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
    let speed = 200
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
}())
