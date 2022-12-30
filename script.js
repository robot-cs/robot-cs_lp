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