import React, { useState, useRef, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';


export default function Recorder({ addToDbFunc, username, myMessages, setMessages, userAudioBlob, setUserBlob }) {


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

        const track = mediaRecorder.stream.getTracks()[0];
        track.onended = () => console.log("ended");

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

        var url = '';

        mediaRecorder.onstop = async function () {
          setRecording({
            active: false,
            available: true,
            url
          });
          console.log("stopped");
          {/* blob*/ }
          url = URL.createObjectURL(chunks.current[0])
          console.log("before" + JSON.stringify(userAudioBlob))
          setUserBlob(recording.url)
          console.log("after" + JSON.stringify(userAudioBlob))


          chunks.current = [];
{/** blob */ }
          
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

  useEffect(()=>{
    getAccess();
  })

  function stopRecording () {
    stream.recorder.stop();

  }

  return (
    <div className="App">
     
        <div className="audio-container">
          <button
            className={recording.active ? "active" : null}
            onClick={() => !recording.active && stream.recorder.start()}>Start Recording</button>
          <button onClick={() => stopRecording()}>Stop recording</button>
          {recording.available && <audio controls src={recording.url} />}
   
        </div>
        {/*} <i  ref={hideRecorder} onClick={hide(recordMenu)} className="bi bi-mic-fill"></i> */}

    </div>
  );
}
