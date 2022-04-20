import React, { useState, useRef, useEffect } from "react";
import './Recorder.css'

{/*function for the recording messages**/ }
export default function Recorder({ setUserBlob }) {

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
  {/* getting the accsses for the recording**/ }
  function getControl() {
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
        mediaRecorder.onstop = function () {
          console.log("stopped");
          const url = URL.createObjectURL(chunks.current[0])
          chunks.current = [];
          setRecording({
            active: false,
            available: true,
            url
          });
          {/* blob for the state of the url value*/ }
          setUserBlob(url)
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
    getControl();
  }, [])


  return (
    <div className="Recorder">

        <div className="audio-container">
          <button
            className={recording.active ? "active" : null}
            onClick={() => !recording.active && stream.recorder.start()}
          >
            Start Recording
          </button>
          <button id="stopButton" onClick={function (e) { stream.recorder.stop(); }}>Stop Recording</button>
          {recording.available && <audio controls src={recording.url} />}

        </div>
      </div>
  )
}


