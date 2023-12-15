import { updateDeviceAsync } from "./api.mjs";
import {
  getClearString,
  getDevice,
  getRoomName,
  getSchduleTime,
} from "./helper.mjs";
import { transcriptConfig } from "./transcript.config.mjs";

const speechButton = document.querySelector(".speak");
const stopSpeechButton = document.querySelector(".stop");

function runSpeechRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "ar-EG";

  function abortSpeechRecognition() {
    recognition.stop();
  }

  recognition.onstart = function () {
    stopSpeechButton.addEventListener("click", abortSpeechRecognition);
  };

  recognition.onspeechend = abortSpeechRecognition;

  recognition.onresult = async function (event) {
    let transcript = getClearString(event.results[0][0].transcript);

    console.log({ transcriptBefore: transcript });

    const time = getSchduleTime(transcript, transcriptConfig.dayStatus);
    transcript = time?.clearTranscript || transcript;
    const roomName = getRoomName(transcript, transcriptConfig.rooms);
    transcript = roomName?.clearTranscript || transcript;

    let device = getDevice(transcript, transcriptConfig.open, 1);
    if (!device.Name) {
      device = getDevice(transcript, transcriptConfig.close, 0);
    }

    console.log({ transcriptAfter: transcript });
    console.log({
      ...device,
      time: time?.time,
      roomName: roomName?.roomName,
    });

    if (!device.Name) return;
    await updateDeviceAsync({
      device,
      time: time?.time,
      roomName: roomName?.roomName,
    });
  };

  recognition.start();
}

speechButton.addEventListener("click", runSpeechRecognition);
