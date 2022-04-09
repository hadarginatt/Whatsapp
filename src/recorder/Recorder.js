import React, { useState, useRef } from "react";


export default function Recorder({addToDbFunc, userAudioBlob, setUserBlob, username, myMessages, setMessages}) {
  const [stream, setStream] = useState({
    access: false,
    recorder: null,
    error: ""
  });

  const [recording, setRecording] = useState({
    active: false,
    available: false,
    url: ""
  });

  const chunks = useRef([]);

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

        // const track = mediaRecorder.stream.getTracks()[0];
        // track.onended = () => console.log("ended");

        mediaRecorder.onstart = function () {
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

        var url = '';

        mediaRecorder.onstop = async function () {
          console.log("stopped");
{/* blob*/}
          url = URL.createObjectURL(chunks.current[0]);
          setUserBlob(url);
          

          chunks.current = [];

          setRecording({
            active: false,
            available: true,
            url
          });
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
          <button onClick={ function(e) { stream.recorder.stop();
            addToDbFunc(username, myMessages, setMessages, userAudioBlob);}}>Stop and send</button>
          {recording.available && <audio controls src={recording.url} />}


        </div>
      ) : (
        <button onClick={function(e) {getAccess()}}>
        <i className="bi bi-mic-fill"></i>
        </button>
      )}
    </div>
  );
}

