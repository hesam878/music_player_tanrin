const musicContainer = $('#music-container');
const playBtn = $('#play');
const prevBtn = $('#prev');
const nextBtn = $('#next');
const audio = $('#audio')[0];
const progress = $('#progress');
const progressContainer = $('#progress-container');
const title = $('#title');
const cover = $('#cover');
const currTime = $('#currTime');
const durTime = $('#durTime');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

loadSong(songs[songIndex]);

function loadSong(song) {
      title.text(song);
    if (title.text()=='hey'){
        title.text('درود');
    }
    if (title.text()=='summer'){
        title.text('تابستان');
    }
    if (title.text()=='ukulele'){
        title.text('یوکللی');
    }

    cover.attr('src',`../images/${song}.jpg`);
    audio.src = `../music/${song}.mp3`;
}

function playSong() {
  musicContainer.addClass('play');
  playBtn.find('i.fas').removeClass('fa-play');
  playBtn.find('i.fas').addClass('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.removeClass('play');
  playBtn.find('i.fas').addClass('fa-play');
  playBtn.find('i.fas').removeClass('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.css('width',`${progressPercent}%`);
}

function setProgress(e) {
  const width = $(this).width();
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	currTime.html(min +':'+ sec);

	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;

	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 
	
	get_sec_d (duration);

	durTime.html(min_d +':'+ sec_d);
		
};

playBtn.on('click', () => {
  const isPlaying = musicContainer.hasClass('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.on('click', prevSong);
nextBtn.on('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.on('click', setProgress);

audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate',DurTime);