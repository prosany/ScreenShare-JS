const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const start = document.getElementById("start");
const stop = document.getElementById("stop");

const gdmOptions = {
  video: {
    cursor: "always",
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};

// async function startCapture(displayMediaOptions) {
//   let captureStream = null;

//   try {
//     captureStream = await navigator.mediaDevices.getDisplayMedia(
//       displayMediaOptions
//     );
//   } catch (err) {
//     console.error(`Error: ${err}`);
//   }
//   return captureStream;
// }

async function startCapture() {
  logElem.innerHTML = "";

  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
      gdmOptions
    );
    dumpOptionsInfo();
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

function dumpOptionsInfo() {
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];

  console.info("Track settings:");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track constraints:");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

// Set event listeners for the start and stop buttons
start.addEventListener(
  "click",
  (evt) => {
    startCapture();
  },
  false
);

stop.addEventListener(
  "click",
  (evt) => {
    stopCapture();
  },
  false
);
