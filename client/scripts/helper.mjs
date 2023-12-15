function getDevice(transcript, commands, status) {
  const transcriptSplit = transcript.split(" ");

  const commandIndex = transcriptSplit.findIndex((word) =>
    commands.includes(word)
  );
  if (commandIndex === -1) return { Name: "", status: false, nameImage: "" };

  const deviceName = transcriptSplit.slice(commandIndex + 1).join(" ");
  // if (!transcriptSplit.includes(deviceName)) {
  //   return { Name: "", status: false, nameImage: "" };
  // }

  return { Name: deviceName, status, nameImage: "" };
}

function getTransctiptWithoutTime({
  transcript,
  transcriptSplit,
  time,
  timeDate,
  dayStatusCommands,
}) {
  let clearTranscript = transcript.replace(time[0], "").trim();

  const nightDayIndex = transcriptSplit.findIndex((word) =>
    dayStatusCommands.night.includes(word)
  );

  const dayIndex = transcriptSplit.findIndex((word) =>
    dayStatusCommands.day.includes(word)
  );

  const hourWordIndex = transcriptSplit.findIndex((word) =>
    dayStatusCommands.hour.includes(word)
  );

  if (nightDayIndex !== -1) {
    timeDate = new Date(timeDate).setHours(new Date(timeDate).getHours() + 12);
  }

  if (nightDayIndex !== -1) {
    clearTranscript = clearTranscript
      .replace(transcriptSplit[nightDayIndex], "")
      .trim();
  }

  if (dayIndex !== -1) {
    clearTranscript = clearTranscript
      .replace(transcriptSplit[dayIndex], "")
      .trim();
  }

  if (hourWordIndex !== -1) {
    clearTranscript = clearTranscript
      .replace(transcriptSplit[hourWordIndex], "")
      .trim();
  }

  return { time: timeDate, clearTranscript };
}

function getSchduleTime(transcript, dayStatusCommands) {
  const transcriptSplit = transcript.split(" ");
  const TIME_REGX = /\d+:\d+/;

  const time = transcript.match(TIME_REGX);
  if (!time || !time[0]) return;

  const timeByHourAndMins = time[0].trim().split(":");
  let timeDate = new Date().setHours(
    timeByHourAndMins[0],
    timeByHourAndMins[1]
  );

  const transctiptWithoutTime = getTransctiptWithoutTime({
    transcript,
    transcriptSplit,
    time,
    timeDate,
    dayStatusCommands,
  });

  return {
    time: transctiptWithoutTime.time,
    clearTranscript: transctiptWithoutTime.clearTranscript,
  };
}

function getRoomName(transcript, rooms) {
  const transcriptSplit = transcript.split(" ");
  const roomNameIndex = transcriptSplit.findIndex((word) =>
    rooms.includes(word)
  );
  if (roomNameIndex === -1) return "";

  const roomName = transcriptSplit[roomNameIndex + 1];
  if (!roomName) return "";

  console.log({ transcriptSplit });

  const inCharIndex = transcriptSplit.findIndex(
    (word) => word === "في" || word === "فى"
  );

  const clearTranscript = transcriptSplit.slice(0, inCharIndex).join(" ");

  return { roomName, clearTranscript };
}

// function convertWordsToNumbers(transcript) {
//   const numbers = {
//     واحد: "1",
//     اثنين: "2",
//     ثلاثه: "3",
//     اربعه: "4",
//     خمسه: "5",
//     سته: "6",
//     سبعه: "7",
//     ثمانيه: "8",
//     تسعه: "9",
//     عشره: "10",
//     "احدى عشر": "11",
//     "اثنى عشر": "12",
//     "ثلاثة عشر": "13",
//     "اربعة عشر": "14",
//     "خمسة عشر": "15",
//     "ستة عشر": "16",
//     "سبعة عشر": "17",
//     "ثمانية عشر": "18",
//     "تسعة عشر": "19",
//     عشرون: "20",
//     "واحد وعشرون": "21",
//     "اثنين وعشرون": "22",
//     "ثلاثه وعشرون": "23",
//     "اربعه وعشرون": "24",
//     "خمسه وعشرون": "25",
//     "سته وعشرون": "26",
//     "سبعه وعشرون": "27",
//     "ثمانيه وعشرون": "28",
//     "تسعه وعشرون": "29",
//     ثلاثون: "30",
//   };

//   const transcriptArray = transcript.split(" ");

//   for (let i = 0; i < transcriptArray.length; i++) {
//     const word = transcriptArray[i];

//     if (numbers[word]) {
//       transcriptArray[i - 1] += numbers[word];
//       transcriptArray.splice(i, 1);
//     }
//   }

//   const transcriptClear = transcriptArray.join(" ");

//   return transcriptClear;
// }

function getClearString(word) {
  const charsForReplace = {
    ة: "ه",
    أ: "ا",
    إ: "ا",
    لأ: "لا",
  };

  const specialCharsPattern = /[.,،؟]/g;

  const clearWord = word
    .replace(specialCharsPattern, "")
    .split("")
    .map((word) => {
      if (charsForReplace[word]) return charsForReplace[word];

      return word;
    })
    .join("")
    .trim();

  return clearWord;
}

export { getDevice, getSchduleTime, getClearString, getRoomName };
