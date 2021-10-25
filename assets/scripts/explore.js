// explore.js

// on load: 
window.addEventListener('DOMContentLoaded', init);

// global vars:
let speechSynth = ""; 
let voiceSelect = "";
let voices = [];
let inputText = "";
let buttonTalk = "";

// called once at start:
function init() {
  // TODO
  speechSynth = window.speechSynthesis;

  // was getting empty list of voices, and 
  // time delay by setTimeout() in itself
  // was not sufficient to prevent this,
  // hence also the just below:
  if(speechSynth.onvoiceschanged !== undefined)
  {
    speechSynth.onvoiceschanged = () => speechSynth.getVoices();
  }

  // load voices
  getVoiceList();

  // set delay for creating list with voices
  setTimeout(createSelectionVoiceList, 50);

  // add event listener to button:
  buttonTalk = document.getElementsByTagName("button")[0];
  buttonTalk.addEventListener("click", buttonPressed);
 
}

// update/transition speaking/smiling face:
function updateFace() {
  // get face
  let imgFace = document.getElementsByTagName("img")[0];
  let imgFaceSrc = imgFace.getAttribute("src");

  // swap face image
  if(imgFaceSrc == "assets/images/smiling.png") {
    imgFace.src = "assets/images/smiling-open.png";
  } else {
    imgFace.src = "assets/images/smiling.png";
  }
}

// button event handler:
function buttonPressed() {
  // get textarea:
  inputText = document.getElementById("text-to-speak");

  // get speech synthesis:
  let textToSay = new SpeechSynthesisUtterance(inputText.value);

  // Needed to get name selected, not entire entry 
  // for language selected:
  // let selectedOption = voiceSelect.value;
  // console.log("selectedOption: ", selectedOption);
  // hence the below.

  // get selected option:
  let selectedOption = voiceSelect.selectedOptions[0].getAttribute("value");

  // find selected voice:
  for(let i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      textToSay.voice = voices[i];
      break;
    }
  }

  // just below doesn't work as selectedOption here is 
  // a string, not the desired speech-related type
  // let selectedOption = voiceSelect.value;
  // console.log("selectedOption: ", selectedOption);
  // textToSay.voice = selectedOption;

  // turn to smiley-open :
  textToSay.onstart = function() {
    updateFace();
  }

  // start speaking a new utterance only if
  // not already speaking / have finished speaking:
  if(!speechSynth.speaking)
  {
    speechSynth.speak(textToSay);
  }

  // turn to just smiley(-closed) after done speaking:
  textToSay.onend = function() {
    updateFace();
  }

  // updateFace();
  // while(speechSynth.speaking) {
    // stall until no longer speaking
  // }
  // updateFace();
}

// load voices:
function getVoiceList() {
  voices = speechSynth.getVoices();
}

// create selection list with voices:
function createSelectionVoiceList() {
  // load voices:
  getVoiceList();

  voiceSelect = document.querySelector("#voice-select");

  // add options for voices to selection list:
  let option = "";
  for(let i = 0; i < voices.length; i++) {
    option = document.createElement("option");
    option.textContent = voices[i].name + " (" 
      + voices[i].lang + ")";
    if(voices[i].default) {
      option.textContent += " -- SET TO DEFAULT";
    }
    option.setAttribute("value", voices[i].name);

    voiceSelect.appendChild(option);
  }
}
