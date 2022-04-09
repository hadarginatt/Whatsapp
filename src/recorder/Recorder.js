import React, { useState, useRef } from "react";


export default function Recorder({ addToDbFunc, username, myMessages, setMessages }) {

  // state of audio recording content
  const [userAudioBlob, setUserBlob] = useState('null');


  // for record display and hidden functionality
  //const [recordMenu, hideRecordMenu] = useState('null');

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
          {/* blob*/ }
          url = URL.createObjectURL(chunks.current[0])
          // console.log("before" + JSON.stringify(userAudioBlob))
          // setUserBlob(recording.url)
          // console.log("after" + JSON.stringify(userAudioBlob))


          chunks.current = [];
{/** blob */ }
          setRecording({
            active: false,
            available: true,
            url
          });
          addToDbFunc(username, myMessages, setMessages, url)
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
          <button onClick={function (e) {stream.recorder.stop();}}>Stop and send</button>
          {recording.available && <audio controls src={recording.url} />}
   
        </div>
      ) : (
        <button onClick={function (e) { getAccess()}}>
        {/*}
        // useState try - need to change from visibile to hidden
        <button onClick={()=>hideRecordMenu(prev => !prev)}  aria-hidden="true"><i className="bi bi-mic-fill"></i></button>
      */}
        
          <i className="bi bi-mic-fill"></i>
        </button>
        
      )}
    </div>
  );
}


   {/*
      **for record display and dissmiss**
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
             /// add functionality of dissmis
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
      */}