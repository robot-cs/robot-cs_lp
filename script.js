const video=document.querySelector('#video');
const video_btn = document.querySelector('#video-btn');
let is_playing =false;

video_btn.addEventListener('click',() => {
	if (!is_playing) {
		video.play();
		is_playing=true;
	} else {
		video.pause();
		is_playing=false;
	}
});

(window.onload = function() {

  // フェードイン処理
  jQuery(window).scroll(function (){
    jQuery(".fade").each(function(){
      var winheight = jQuery(window).height();
      var posi = jQuery(this).offset().top;
      var scroll = jQuery(window).scrollTop();
      if (scroll + winheight > posi){
        jQuery(this).addClass("fadein");
      } else {
        //　スクロールで画面上部に戻った際に要素を非表示にしたい場合は、下記の行のコメントを外し有効にしてください。
        //jQuery(this).removeClass("fadein");
      }
    });
   });

})(); 
