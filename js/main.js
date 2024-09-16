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
    name: "Turbo",
    artist: "Big Baby Tape",
    image: "https://avatars.yandex.net/get-music-content/9837520/803771a6.a.32589300-2/200x200",
    path: "audio/Big_Baby_Tape_-_Turbo_Majestic_78196434.mp3"
  },
  {
    name: "Corvette",
    artist: "KRISTIEE, mapt0v, whyspurky",
    image: "https://i.pinimg.com/236x/0d/72/00/0d72006dad9f7912076df1e9a0c4c0f8.jpg",
    path: "audio/KRISTIEE, mapt0v, whyspurky — Corvette (www.lightaudio.ru).mp3"
  },
  {
    name: "Портреты",
    artist: "nexisez",
    image: "https://avatars.yandex.net/get-music-content/10641165/9bf0b4df.a.29560519-1/200x200",
    path: "audio/nexizes — Портреты (www.lightaudio.ru).mp3",
  },
  {
    name: "Сутенёр",
    artist: "Scally Milano, uglystephan",
    image: "https://avatars.yandex.net/get-music-content/10960834/93b955ce.a.32138135-1/200x200",
    path: "audio/scally-milano-uglystephan-sutener.mp3",
  },
  {
    name: "Лунатик",
    artist: "Josodo",
    image: "https://avatars.yandex.net/get-music-content/9707577/267fb893.a.25824839-1/200x200",
    path: "audio/Josodo_-_Lunatik_(musmore.org).mp3",
  },
  {
    name: "ПРЕСЛЕДОВАНИЕ 8:08",
    artist: "4n Way",
    image: "https://avatars.yandex.net/get-music-content/10139807/27329472.a.28620746-1/200x200",
    path: "audio/4n Way - ПРЕСЛЕДОВАНИЕ 8_08.mp3",
  },
  {
    name: "СВИТЕР MARNI",
    artist: "4n Way",
    image: "https://avatars.yandex.net/get-music-content/10139807/27329472.a.28620746-1/200x200",
    path: "audio/4n_Way_-_SVITER_MARNI_77983509.mp3",
  },
  {
    name: "ИРИСКИ",
    artist: "prod. by G6K - AQYLA, Voskresenskii",
    image: "https://avatars.yandex.net/get-music-content/10960834/704bdaa5.a.31829931-1/200x200",
    path: "audio/AQYLA_Voskresenskii_-_IRISKI_78055629.mp3",
  },
  {
    name: "Папа",
    artist: "prod. by Kreestabape, Krishtall ZHS - AQYLA, Krishtall ZHS",
    image: "https://i.pinimg.com/564x/d7/5f/78/d75f787992747bfc3f0f96e15b66a7d9.jpg",
    path: "audio/AQYLA, Krishtall ZHS - Папа.mp3",
  },
  {
    name: "Гринч",
    artist: "VisaGangBeatz, MAYOT, SEEMEE",
    image: "https://i.pinimg.com/564x/35/d5/d7/35d5d7cf42db7606ef9786deb55bfb1a.jpg",
    path: "audio/VisaGangBeatz_feat_MAYOT_SEEMEE_-_Grinch_69230250.mp3",
  },
  {
    name: "AMMO",
    artist: "FRIENDLY THUG 52 NGG",
    image: "https://avatars.yandex.net/get-music-content/10918712/02fea458.a.31461919-1/200x200",
    path: "audio/FRIENDLY_THUG_52_NGG_-_AMMO_77889643.mp3",
  },
  {
    name: "Три",
    artist: "ТРАВМА, RVMZES",
    image: "https://avatars.yandex.net/get-music-content/5696151/1d3f0328.a.20610977-1/200x200",
    path: "audio/TRAVMA_RVMZES_-_Tri_73726587.mp3",
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
  now_playing.textContent = " Играет " + (track_index + 1) + " / " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
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
  curr_track.volume = volume_slider.value / 50;
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


