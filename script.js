//動画再生・停止
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

//mainのスライドイン動作
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

//モード切り替え
var icon = document.querySelector("#icon");

icon.onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.getElementById("site-title").classList.toggle("dark-mode-a");
  document.getElementById("nav-about").classList.toggle("dark-mode-a");
  document.getElementById("nav-works").classList.toggle("dark-mode-a");
  document.getElementById("nav-news").classList.toggle("dark-mode-a");
  document.getElementById("nav-contact").classList.toggle("dark-mode-a");
  document.getElementById("nav-twitter").classList.toggle("dark-mode-a");
  document.getElementById("nav-to-top").classList.toggle("dark-mode-a");
  if (document.body.classList.contains("dark-mode")) {
    icon.src = "img/mode/sun.png";
  } else {
    icon.src = "img/mode/moon.png";
  }
};

//BGM
const my_song = document.getElementById("bgm");
const bgm_btn = document.getElementById("bgm-btn");

my_song.volume = 0.3;

bgm_btn.onclick = () => {
  if (my_song.paused) {
    my_song.play();
    bgm_btn.classList.add("clicked");
  }
  else{
    my_song.pause();
    bgm_btn.classList.remove("clicked");
  }
}

my_song.onended = () => {
  bgm_btn.classList.remove("clicked");
}