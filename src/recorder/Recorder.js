import React, { useState, useRef, useEffect } from "react";

{/*function for the recording messages**/ }
export default function Recorder({ addToDbFunc, username, myMessages, setMessages, userAudioBlob, setUserBlob }) {

  {/* state of the stream**/ }
  const [stream, setStream] = useState({
    access: false,
    recorder: null,
    error: ""
  });
  {/* recorder state**/ }
  const [recording, setRecording] = useState({
    active: false,
    available: false,
    url: ""
  });

  const chunks = useRef([]);
  {/* getting the accsses for the recording**/ }
  function getAccess() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((mic) => {
        let mediaRecorder;

        try {
          mediaRecorder = new MediaRecorder(mic, {
            mimeType: "audio/webm"
          });
        } catch (err) {
          console.log(err);
        }

        const track = mediaRecorder.stream.getTracks()[0];
        track.onended = () => console.log("ended");
        {/* starting the recording**/ }
        mediaRecorder.onstart = function () {
          console.log("start");
          setRecording({
            active: true,
            available: false,
            url: ""
          });
        };

        mediaRecorder.ondataavailable = function (e) {
          console.log("data available");
          chunks.current.push(e.data);
        };

        // var url = '';
{/* stopping the recording**/ }
        mediaRecorder.onstop = async function () {
          console.log("stopped");
          const url = URL.createObjectURL(chunks.current[0])
          chunks.current = [];
          setRecording({
            active: false,
            available: true,
            url
          });
          {/* blob for the state of the url value*/ }
          console.log("before" + JSON.stringify(userAudioBlob))
          setUserBlob(url)
          console.log("after" + JSON.stringify(userAudioBlob))
          // addToDbFunc(username, myMessages, setMessages, url)
        };



        setStream({
          ...stream,
          access: true,
          recorder: mediaRecorder
        });
      })
      .catch((error) => {
        console.log(error);
        setStream({ ...stream, error });
      });
  }

  useEffect(() => {
    getAccess();
  })

  return (
    <div className="App">
      {stream.access ? (
        <div className="audio-container">
          <button
            className={recording.active ? "active" : null}
            onClick={() => !recording.active && stream.recorder.start()}
          >
            Start Recording
          </button>
          <button onClick={function (e) { stream.recorder.stop(); }}>Stop and send</button>
          {recording.available && <audio controls src={recording.url} />}

        </div>
      ) : (<button onClick={function (e) { getAccess() }}></button>)} </div>
  )
}


