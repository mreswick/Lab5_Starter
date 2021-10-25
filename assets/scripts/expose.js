// expose.js

// for window load:
window.addEventListener('DOMContentLoaded', init);

// confetti:
const jsConfetti = new JSConfetti();

// called once at start:
function init() {
  // TODO
  // img for horn:
  let selectHorn = document.getElementById("horn-select");
  selectHorn.addEventListener("input", selectHornListener);

  // audio file for horn:
  selectHorn.addEventListener("input", selectHornAudio);

  // volume for audio:
  let volHorn = document.getElementById("volume");
  volHorn.addEventListener("input", volHornAudio);

  // play button:
  let buttonHorn = document.getElementsByTagName("button")[0];
  buttonHorn.addEventListener("click", playAudio);

}

// volume for horn handler:
function volHornAudio() {
  // vol img icon:
  let volIcon = document.querySelector("div img");

  // audio:
  let audioHorn = document.querySelector("audio.hidden");

  // set audio volume:
  let vol = this.value;
  audioHorn.volume = vol / 100;

  // set volume icon:
  if(vol == 0) {
    volIcon.src = "assets/icons/volume-level-0.svg";
  } else if(vol >= 1 && vol < 33) {
    volIcon.src = "assets/icons/volume-level-1.svg";
  } else if(vol >= 33 && vol < 67) {
    volIcon.src = "assets/icons/volume-level-2.svg";
  } else if(vol >= 67) {
    volIcon.src = "assets/icons/volume-level-3.svg";
  } else {
    audioHorn.volume = 1.0;
  }

}

// handle playing the audio:
function playAudio() {
  // get audio and selection:
  let audioHorn = document.querySelector("audio.hidden");
  let selectHorn = document.getElementById("horn-select");
  let selection = selectHorn.value;
 
  // get  audio volume:
  let audioHorn = document.querySelector("audio.hidden");
  let vol = audioHorn.value;

  // play audio only if selection made:
  if(audioHorn.getAttribute("src") != "") {
    audioHorn.play();
    // play with confetti if party-horn selected:
    if(selection == "party-horn" && vol != 0.0) {
      jsConfetti.addConfetti();
    }
  }
  
}

// handle seleciton of audio:
function selectHornAudio() {
  // get elements
  let audioHorn = document.querySelector("audio.hidden");
  let selectHorn = document.getElementById("horn-select");

  let selection = selectHorn.value; // gets value= of selected option
  // set image of img tag per selection:
  if(selection == "air-horn") {
    audioHorn.src = "assets/audio/air-horn.mp3";
  } else if(selection == "car-horn") {
    audioHorn.src = "assets/audio/car-horn.mp3";
  } else if(selection == "party-horn") {
    audioHorn.src = "assets/audio/party-horn.mp3";
  }
}

// handle img selection for selected horn:
function selectHornListener() {
  // get elements
  let imgHorn = document.querySelector("section img");
  let selectHorn = document.getElementById("horn-select");

  let selection = selectHorn.value; // gets value= of selected option
  // set image of img tag per selection:
  if(selection == "air-horn") {
    imgHorn.src = "assets/images/air-horn.svg";
  } else if(selection == "car-horn") {
    imgHorn.src = "assets/images/car-horn.svg";
  } else if(selection == "party-horn") {
    imgHorn.src = "assets/images/party-horn.svg";
  } else {
    imgHorn.src = "assets/images/no-image.png";
  }
}