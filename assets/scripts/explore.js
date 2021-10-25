// explore.js

window.addEventListener('DOMContentLoaded', init);
let speechSynth = ""; 
let voiceSelect = "";
let voices = [];
let inputText = "";
let buttonTalk = "";

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

  console.log("speechSynth: ", speechSynth);
  getVoiceList();

  setTimeout(createSelectionVoiceList, 500);

  

  // add event listener to button:
  buttonTalk = document.getElementsByTagName("button")[0];
  buttonTalk.addEventListener("click", buttonPressed);
 
}

function updateFace() {
  let imgFace = document.getElementsByTagName("img")[0];
  let imgFaceSrc = imgFace.getAttribute("src");

  if(imgFaceSrc == "assets/images/smiling.png") {
    imgFace.src = "assets/images/smiling-open.png";
  } else {
    imgFace.src = "assets/images/smiling.png";
  }
}

function buttonPressed() {
  console.log("In buttonPressed().");
  // get textarea:
  inputText = document.getElementById("text-to-speak");
  console.log("inputText value: ", inputText.value);

  let textToSay = new SpeechSynthesisUtterance(inputText.value);
  console.log("textToSay: ", textToSay);

  // Needed to get name selected, not entire entry 
  // for language selected:
  // let selectedOption = voiceSelect.value;
  // console.log("selectedOption: ", selectedOption);

  let selectedOption = voiceSelect.selectedOptions[0].getAttribute("value");
  console.log("selectedOption: ", selectedOption);

  for(let i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      console.log("entered if for voice choice.");
      textToSay.voice = voices[i];
      break;
    }
  }

  console.log("voice to use, textToSay.voice: ", textToSay.voice);

  // just below doesn't work as selectedOption here is 
  // a string, not the desired speech-related type
  // let selectedOption = voiceSelect.value;
  // console.log("selectedOption: ", selectedOption);
  // textToSay.voice = selectedOption;

  // turn to smiley-open :
  textToSay.onstart = function() {
    updateFace();
  }
  
  if(!speechSynth.speaking)
  {
    speechSynth.speak(textToSay);
  }

  textToSay.onend = function() {
    // turn to just smiley(-closed) after done speaking:
    updateFace();
  }

  // updateFace();
  // while(speechSynth.speaking) {
    // stall until no longer speaking
  // }
  // updateFace();
}

function getVoiceList() {
  console.log("In getVoiceList():");
  voices = speechSynth.getVoices();
  // console.log("voices: ", voices);
}

function createSelectionVoiceList() {
  getVoiceList();
  console.log("voices: ", voices);

  voiceSelect = document.querySelector("#voice-select");
  console.log("voiceSelect val: ", voiceSelect);

  let option = "";
  for(let i = 0; i < voices.length; i++) {
    // console.log("In for loop, i: ", i);
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
