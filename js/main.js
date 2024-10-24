let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Идеалы",
    artist: "DONOR",
    image: "https://i.pinimg.com/564x/3e/0c/99/3e0c99df3582e4eafc24806ee93edfec.jpg",
    path: "https://muzboy.net/uploads/music/2024/07/DONOR_Idealy.mp3",
  },
  {
    name: "Corvette",
    artist: "KRISTIEE, mapt0v, whyspurky",
    image: "https://i.pinimg.com/236x/0d/72/00/0d72006dad9f7912076df1e9a0c4c0f8.jpg",
    path: "https://muzfo.net/uploads/files/kristiee-mapt0v-whyspurky-corvette.mp3"
  },
  {
    name: "Сутенёр",
    artist: "Scally Milano, uglystephan",
    image: "https://avatars.yandex.net/get-music-content/10960834/93b955ce.a.32138135-1/200x200",
    path: "https://muzfo.net/uploads/files/scally-milano-uglystephan-sutener.mp3",
  },
  {
    name: "СВИТЕР MARNI",
    artist: "4n Way",
    image: "https://i.pinimg.com/236x/f9/68/80/f968801e6ed82628e3ac728516970b8d.jpg",
    path: "https://rus.hitmotop.com/get/music/20240616/4n_Way_-_SVITER_MARNI_77983509.mp3",
  },
  {
    name: "Гринч",
    artist: "VisaGangBeatz, MAYOT, SEEMEE",
    image: "https://i.pinimg.com/736x/f2/07/49/f20749084e737087e04a4e0497595cdd.jpg",
    path: "https://rus.hitmotop.com/get/music/20200418/VisaGangBeatz_feat_MAYOT_SEEMEE_-_Grinch_69230250.mp3",
  },
  {
    name: "Три",
    artist: "ТРАВМА, RVMZES",
    image: "https://i.pinimg.com/564x/6c/dd/ca/6cddcabf21b2ad443d304dcd69b8eba3.jpg",
    path: "https://rus.hitmotop.com/get/music/20220129/TRAVMA_RVMZES_-_Tri_73726587.mp3",
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


