// Polyfill IE11 forEach
if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

$(document).ready(function() {
  setTimeout(function() {
    jQuery('.intro').fadeOut();
  }, 3000);
});


/* Player audio */

function player() {
  if (audioTrack.paused) {
    playButton.setAttribute("aria-label", "stop");
    playButton.innerHTML = `<svg class='icon icon--pause' aria-hidden='true'>
                              <use xlink:href='./assets/img/icons/icons.svg#btn-pause'></use>
                            </svg>`;

    audioTrack.play();
	} else {
    playButton.setAttribute("aria-label", "play pause toggle");
    playButton.innerHTML = `<svg class='icon icon--play' aria-hidden='true'>
                            <use xlink:href='./assets/img/icons/icons.svg#btn-play'></use>
                          </svg>`;
    audioTrack.pause();
  }
}

function playerVideo() {
  if (videoTrack.paused) {
    videoPlayButton.setAttribute("aria-label", "play pause toggle");
    videoPlayButton.innerHTML = `<svg class='icon icon--play' aria-hidden='true'>
                                  <use xlink:href='./assets/img/icons/icons.svg#btn-play'></use>
                                </svg>`;
    videoTrack.play();
	} else {
    videoPlayButton.setAttribute("aria-label", "stop");
    videoPlayButton.innerHTML = `<svg class='icon icon--pause' aria-hidden='true'>
                                  <use xlink:href='./assets/img/icons/icons.svg#btn-pause'></use>
                                </svg>`;
    videoTrack.pause();
  }
}

function finish() {
  audioTrack.currentTime = 0;
  playButton.setAttribute("aria-label", "play pause toggle");
}

function updatePlayhead() {
	playhead.value = audioTrack.currentTime;
	var s = parseInt(audioTrack.currentTime % 60);
  var m = parseInt((audioTrack.currentTime / 60) % 60);
  s = (s >= 10) ? s : "0" + s;
  m = (m >= 10) ? m : "0" + m;
  playbacktime.querySelector('.min .val').innerHTML = m;
  playbacktime.querySelector('.separator').innerHTML = ':';
  playbacktime.querySelector('.seconds .val').innerHTML = s
}

function setAttributes(el, attrs) {
	for(var key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}

var audioPlayer = document.getElementById("audioplayer"),
    playback = document.getElementById("playback"),
    audioTrack = document.getElementById("audiotrack"),
    playbackTime = document.getElementById("playbacktime"),
    playbackProgress = document.getElementById("playbackprogress"),
    playButton = document.createElement("button"),
    playhead = document.createElement("progress")



if (duration) {
  var duration = audioTrack.duration;
}

if (audioPlayer) {
  setAttributes(playButton, { "aria-label": "stop" });
  playButton.innerHTML = `<svg class='icon icon--pause' aria-hidden='true'>
                            <use xlink:href='./assets/img/icons/icons.svg#btn-pause'></use>
                          </svg>`;

  //setAttributes(playhead, { "min": "0", "max": "100", "value": "0", "id": "playhead" });
  playback.appendChild(playButton);
  playbackProgress.appendChild(playhead);
  audioTrack.removeAttribute("controls");
  playButton.addEventListener("click", player, false);
  audioTrack.addEventListener('playing', function() { playhead.max = audioTrack.duration; }, false);
  audioTrack.addEventListener('timeupdate', updatePlayhead, false);
  audioTrack.addEventListener('ended', finish, false);
}













/* Player Vidéo */

var videoplayer = document.getElementById("videoplayer"),
    videoPlayback = document.getElementById("videoplayback"),
    videoTrack = document.getElementById("videotrack"),
    videoPlayButton = document.createElement("button");

setAttributes(videoPlayButton, { "aria-label": "stop" });
videoPlayButton.innerHTML = `<svg class='icon icon--pause' aria-hidden='true'>
                              <use xlink:href='./assets/img/icons/icons.svg#btn-pause'></use>
                            </svg>`;

if (videoPlayback) {
  videoPlayback.appendChild(videoPlayButton);
  videoTrack.removeAttribute("controls");
  videoPlayButton.addEventListener("click", playerVideo, false);
  videoTrack.addEventListener('ended', finish, false);
}