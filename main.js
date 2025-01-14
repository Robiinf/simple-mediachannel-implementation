const localVideo = document.getElementById("localVideo");
const peerVideo = document.getElementById("peerVideo");

// execute start function when user clicks on start button
document.getElementById("start").addEventListener("click", () => {
  document.getElementById("peers").style.zIndex = "1";
  document.getElementById("local").style.zIndex = "2";
  start();
});

document.getElementById("stop").addEventListener("click", () => {
  document.getElementById("peers").style.zIndex = "2";
  document.getElementById("local").style.zIndex = "1";
  stop();
});

// Our Entire WebRTC lifecycle
async function start() {
  // getting user's video and mic permission and stream

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  console.log("Local media stream obtained.", stream);

  // display local video on local video element
  localVideo.srcObject = stream;

  // initiate Peer connection by creating RTCPeerconnection
  const PC1 = new RTCPeerConnection(); // local end of the connection
  const PC2 = new RTCPeerConnection(); // peer end of the connection

  console.log("PeerConnections created.");

  // add ice candidate
  PC1.addEventListener("icecandidate", ({ candidate }) => {
    PC2.addIceCandidate(candidate);
  });
  PC2.addEventListener("icecandidate", ({ candidate }) => {
    PC1.addIceCandidate(candidate);
  });

  // get tracks from our stream
  stream.getTracks().forEach((track) => {
    console.log("Adding track:", track);
    PC1.addTrack(track, stream);
  });

  // listen on peer end of the connection
  PC2.addEventListener("track", ({ streams: [stream] }) => {
    // display on peer video element
    console.log("Received track on PC2.");

    peerVideo.srcObject = stream;
  });

  // create offer
  const offer = await PC1.createOffer({
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1,
  });

  console.log("Offer created:", offer);

  // setting offer
  await PC1.setLocalDescription(offer);
  await PC2.setRemoteDescription(offer);

  // create answer
  const answer = await PC2.createAnswer();

  console.log("Answer created:", answer);

  // set answer
  await PC2.setLocalDescription(answer);
  await PC1.setRemoteDescription(answer);
}

async function stop() {
  // stop the stream
  const stream = localVideo.srcObject;
  const tracks = stream.getTracks();

  tracks.forEach((track) => track.stop());
  localVideo.srcObject = null;
  peerVideo.srcObject = null;
}
