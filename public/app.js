class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/1kick-drum-alorsdanse.mp3";
    this.currentSnare = "./sounds/1handclap-alorsdanse.mp3";
    this.currentHihat = "./sounds/hihat.acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }

  activePad() {
    this.classList.toggle("active");
  }

  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //Check if pads are active
      if (bar.classList.contains("active")) {
        //Check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    //Check if it is playing
    if (this.isPlaying) {
      //Clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }

  updateBtn() {
    //NULL
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    tempoText.innerText = e.target.value;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new Drumkit();

//Event Listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", () => {
  drumKit.updateBtn();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});

///////////////// Piano App //////////////////////
const WHITE_KEYS = ["Z", "X", "C", "V", "B", "N", "M", "R", "T", "Y", "U", "I", "O", "P"];
const BLACK_KEYS = ["S", "D", "G", "H", "J", "5", "6", "8", "9", "0"];
const SPACE = [" "];

const keys = document.querySelectorAll(".key");
const whiteKeys = document.querySelectorAll(".key.white");
const blackKeys = document.querySelectorAll(".key.black");
const reverbButton = document.querySelector("#reverb");

const recordButton = document.querySelector('.record');
const playButton = document.querySelector('.play-record')
const saveButton = document.querySelector('.save-piano')
const playButtonText = document.querySelector('.play-text')

const keyMap = [...keys].reduce((map,key) => {
  map[key.dataset.note] = key
  return map
}, {})

let recordingStartTime
let songNotes

/* ---------------Event Lısteners--------------- */
keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

reverbButton.addEventListener('click', function() {
  reverbButton.classList.toggle('active')
})

recordButton.addEventListener('click', toggleRecording)
saveButton.addEventListener('click', saveSong)
playButton.addEventListener('click', playSong)

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key.toUpperCase();
  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(whiteKeys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(blackKeys[blackKeyIndex]);
});

document.addEventListener("keyup", (e) => {
  if(!reverbButton.classList.contains("active")){
    
    const key = e.key.toUpperCase();
    console.log(key);
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);

    if (whiteKeyIndex > -1) pauseNote(whiteKeys[whiteKeyIndex]);
    if (blackKeyIndex > -1) pauseNote(blackKeys[blackKeyIndex]);
  }
  });

/* ------------------Functions------------------- */
function toggleRecording() {
  recordButton.classList.toggle('active')
  if (isRecording()) {
    startRecording()
  } else {
    stopRecording()
  }
}

function isRecording () {
  return recordButton != null && recordButton.classList.contains('active')
}

function startRecording() {
  recordingStartTime = Date.now()
  songNotes = []
  playButton.classList.remove('show')
  saveButton.classList.remove('show')
  playButtonText.classList.remove('show')
}

function stopRecording() {
  playSong()
  playButton.classList.add('show')
  saveButton.classList.add('show')
  playButtonText.classList.add('show')
}

function playSong() {
  if (songNotes.length === 0) return
  songNotes.forEach(note => {
    setTimeout(() => {
      playNote(keyMap[note.key])
    }, note.startTime)
  })
}

function playNote(key) {
  if (isRecording()) recordNote(key.dataset.note)
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");

  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}

function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime
  })
}

function saveSong() {}

function pauseNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  time = 1000;
  setTimeout(() => {
    noteAudio.pause();
  }, time);
  key.classList.remove("active");
}

///////////////// Trombone App //////////////////////
const TROMBONE_KEYS = ["1", "2", "3", "4"];

const tromboneKeys = document.querySelectorAll(".trombone-button");

/* ---------------Event Lısteners--------------- */
tromboneKeys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  const key = e.key.toUpperCase();
  const tromboneKeyIndex = TROMBONE_KEYS.indexOf(key);
  
  if (tromboneKeyIndex > -1) playNote(tromboneKeys[tromboneKeyIndex]);
});

document.addEventListener("keyup", (e) => {
  if(!reverbButton.classList.contains("active")){
    
    const key = e.key.toUpperCase();
    console.log(key);
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);

    if (whiteKeyIndex > -1) pauseNote(whiteKeys[whiteKeyIndex]);
    if (blackKeyIndex > -1) pauseNote(blackKeys[blackKeyIndex]);
  }
  });