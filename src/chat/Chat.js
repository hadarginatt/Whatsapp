import Logo from './logo.jpeg'
import './Chat.css'
import LeftMenu from '../LeftScreen/LeftMenu'
import React, { useState } from 'react'
import Message from '../message/Message'
import { useLocation } from 'react-router-dom';
import Recorder from '../recorder/Recorder'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import logo2 from '../chat/logo2.jpeg'
import logo from '../chat/logo.jpeg'



function showChat(username, myMessages){
    if (username === "" || username === "null") {
        // show only logo
        return (<img id="startImg" src={logo2} className="card-img-top" alt="..."></img>)
    } else {

        var messagesFromUser = myMessages.find((value) => { return value.user === username }).message;
        // console.log("from showScreen2:" + JSON.stringify(messagesFromUser))

        var showMessage = messagesFromUser.map((message, key) => {
            return <Message type={message.type} content={message.content} time={message.time} fromto={message.fromto} key={key} />
        })
        
        return showMessage;
    }
}


function sendNewMessage(username, myMessages, setMessages){
    //get the new message
    if (username=== "null" || username === "" || document.getElementById("newMessage") === null) {
        return;
    }

    var content = document.getElementById("newMessage").value;
    if (content === "" || content === null){
        return;
    } else {
        // insert into the local database
        var type = "text";
        var time = getTime();
        var fromto = "to";
        var newMessage = {type, content, time, fromto};

        //insert into local data the new data

        var newUserMessages = myMessages;
        // console.log("after:" + JSON.stringify(newUserMessages));
        newUserMessages = newUserMessages.find((value) => { return value.user === username }).message;
        // console.log("after after :" + JSON.stringify(newUserMessages));
        newUserMessages.push(newMessage);

        
        var newM = myMessages;
        newM[username] = newUserMessages;

        setMessages(newM.concat([]));

        // setMessages(myMessages.concat([]))


        //insert into the state of the data the 
        document.getElementById("newMessage").value = "";

    }
}

function addNewAudioMessage(username, myMessages, setMessages, userAudioBlob){
    // insert into the local database
    var type = "audio";
    var content = userAudioBlob;
    var time = getTime();
    var fromto = "to";
    var newMessage = {type, content, time, fromto};

    //insert into local data the new data
    console.log("before in adding audio:" + JSON.stringify(myMessages));
    var newUserMessages = myMessages;
    // console.log("after:" + JSON.stringify(newUserMessages));
    newUserMessages = newUserMessages.find((value) => { return value.user === username }).message;
    // console.log("after after :" + JSON.stringify(newUserMessages));
    newUserMessages.push(newMessage);

    
    var newM = myMessages;
    newM[username] = newUserMessages;

    setMessages(newM.concat([]));
    console.log("after audio:" + JSON.stringify(myMessages))
}

function addNewImageOrVideo (username, myMessages, setMessages, input, type) {
        // insert into the local database
        var content = input;
        var time = getTime();
        var fromto = "to";
        var newMessage = {type, content, time, fromto};
    
        //insert into local data the new data
        console.log("before in adding image:" + JSON.stringify(myMessages));
        var newUserMessages = myMessages;
        // console.log("after:" + JSON.stringify(newUserMessages));
        newUserMessages = newUserMessages.find((value) => { return value.user === username }).message;
        // console.log("after after :" + JSON.stringify(newUserMessages));
        newUserMessages.push(newMessage);
    
        
        var newM = myMessages;
        newM[username] = newUserMessages;
    
        setMessages(newM.concat([]));
        console.log("after image:" + JSON.stringify(myMessages))
}

function showModal(setShowUploadModal) {
    setShowUploadModal(true)
}

function closeModal(setShowUploadModal) {
    setShowUploadModal(false)
}


function showTypeArea(username, myMessages, setMessages, showUploadModal, setShowUploadModal, showRecorderModal, setShowRecorderModal, userAudioBlob, setUserBlob){
   
    if (username === "" || username === "null") {
        return;
    } else {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">

                    <button onClick={function (e) { sendNewMessage(username, myMessages, setMessages) }} id="sendMessage">
                        <i className="bi bi-send-fill"></i>
                    </button>

                    {/**
                    <button id="sendMessage">
                        <i className="bi bi-send-fill"></i>
                    </button>
        */}

                </div>
                <input type="username" className="form-control" id="newMessage" placeholder="New Message..."></input>
                {/** attach button
                <button className='button' onClick={() => { }}>
                    <i className="bi bi-paperclip"></i>
                </button>*/}



                <button type="button" className="bi bi-paperclip" onClick={function (e) {showModal(setShowUploadModal)}}>
                </button>

                {/** send image or video modal */}
                <Modal show={showUploadModal}>
                    <Modal.Header>
                        <h5 className="modal-title" id="exampleModalLabel">Upload Image Or Video</h5>
                        <button onClick={function (e) {closeModal(setShowUploadModal)}} type="button" className="btn-close"></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div><input id="uploadFile" type="file" name="image"/></div>
                        <div id="emptyChoose" className="errorMessage"></div>
                        <div id="wrongChoose" className="errorMessage"></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={function(e) {uploadImgOrVideo(username, myMessages, setMessages, setShowUploadModal);}} type="button" className="btn btn-primary">Upload</button>
                    </Modal.Footer>
                </Modal>

                {/** Recording Modal */}
                <Modal show={showRecorderModal}>
                    <Modal.Header>
                        <h5 className="modal-title">Record</h5>
                        <button onClick={function (e) {closeModal(setShowRecorderModal)}} type="button" className="btn-close"></button>
                    </Modal.Header>
                    <Modal.Body>
                        <Recorder addToDbFunc={addNewAudioMessage} username={username} myMessages={myMessages}
                        setMessages={setMessages} userAudioBlob={userAudioBlob} setUserBlob={setUserBlob}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={function (e) {addNewAudioMessage(username, myMessages, setMessages, userAudioBlob);
                            setShowRecorderModal(false);}} type="button" className="btn btn-primary">Upload</button>
                    </Modal.Footer>
                </Modal>

                


                {/** recording button*/}
               
                <button onClick={function (e) { setShowRecorderModal(true)}}>  <i className="bi bi-mic-fill"></i> </button>
                
            </div>
        )
    }
}



function uploadImgOrVideo (username, myMessages, setMessages, setShowUploadModal) {
    if (isValidImgVideo()) {
        // enter into DB
        var input = URL.createObjectURL(document.getElementById('uploadFile').files[0])
        let images = ['image/jpeg', 'image/jpg', 'image/png','image/gif','image/bmp'];
        let ends = document.getElementById('uploadFile').files[0].type;
        var type;    
        if(images.indexOf(ends)>-1){    
            type="image"
        } else {
            type = "video"
        }
        addNewImageOrVideo(username, myMessages, setMessages, input, type);
        // close the modal
        closeModal(setShowUploadModal);
    }
}


 
function isValidImgVideo() {
    var flagIsValid = true;

//is empty flag
    var flag = true
    var noChoose = document.getElementById("emptyChoose");
    var invalidChoose = document.getElementById("wrongChoose");
    noChoose.innerHTML = ""
    invalidChoose.innerHTML = ""

    // check if not empty
    var fileName = document.getElementById("uploadFile").value;


if(fileName.length === 0){
    flag = false
    var errorHtml = document.createElement('div')
    var message = "Please choose image or video"
    errorHtml.innerHTML = "<p><small id='noImgOrVideo' className='errorMessages'>" + message + "</small></p>"
    noChoose.append(errorHtml)
    return flag;
}
 

//addition for logic
var indexEnd =fileName.lastIndexOf(".") + 1;
var endOfFile = fileName.substr(indexEnd, fileName.length).toLowerCase();
console.log(fileName);
//image validatoin
let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png','image/gif','image/bmp'];
let type = document.getElementById('uploadFile').files[0].type;


// new logic for video vaidation
 if(allowedExtension.indexOf(type)==-1){
    flagIsValid = false;
    
 }
 else if(allowedExtension.indexOf(type)!=-1){
    flagIsValid = true;
     return flagIsValid;
 }

if( endOfFile == "avi" ||  endOfFile=="mvk" ||  endOfFile=="mp4") {
    flagIsValid = true;
    return flagIsValid;
}

   flagIsValid= false;
   var errorHtml = document.createElement('div')
   var message = "wrong type of image or video"
   errorHtml.innerHTML = "<p><small id='invalidImageOrVideo' className='errorMessages'>" + message + "</small></p>"
   invalidChoose.append(errorHtml);
   return flagIsValid;

}



function getTime(){
    var today = new Date();
    var hours = today.getHours()
    if (hours < 10) {
        hours = "0" + hours
    }
    var minutes = today.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
   
    var time =  hours + ":" +  minutes;
    return time;
}


function showUserProfile(username, dataBase){
    if (username === "" || username === "null") {
        return;
    } else {
        var nickName = dataBase.find((value) => {return value.username === username}).nickName
        var img = dataBase.find((value) => {return value.username === username}).img
        return (
            <div id="userNameChat" className="card">
                <div className="card-body">
                    <img id="imgUserChat" src={img}></img>
                    {nickName}
                </div>
            </div>
        )
    }
}

function Chat({ nameConnected, dataBase}) {
    
    // security to the page
    if (nameConnected === "" || nameConnected === "null") {
        window.location.replace("/")
    }

      // state of audio recording content
  const [userAudioBlob, setUserBlob] = useState('null');


    // state of the user name that this user wants to talk to him, saved in the parent component

    const [user, setUser] = useState('null');
    // function to inject to the chikd left menu
    const setUserChat = (newName) => {
        setUser(newName)
    }

    const [showUploadModal, setShowUploadModal] = useState(false);
    var [showRecorderModal, setShowRecorderModal] = useState(false);

    

    //save the messages of my account
    const [myMessages, setMyMessages] = useState(dataBase.find((value) => { return value.username === nameConnected }).messages);
    console.log("messages:" + JSON.stringify(myMessages))

    return (
        <div>
        <div className="row" id="header"><img src={logo}></img><p id="namePage">Chats</p></div>
            <div className="container-fluid" id="screen">
                <div id="chats" className="row">
                    {/**side screen */}
                    {/**the property param for the child */}
                    <div id="leftMenu" className='col-3'>
                        <LeftMenu nameConnected={nameConnected} setUserChat={setUserChat} myMessages={myMessages} setMyMessages={setMyMessages} dataBase={dataBase} />
                    </div>

                    {/**main screen */}

                    <div id="mainScreen" className="col-9">
                        {showUserProfile(user, dataBase)}
                        <div id="chat" className="row card">
                            {showChat(user, myMessages)}
                        </div>
                        <div id="screenLimit">
                            {showTypeArea(user, myMessages, setMyMessages, showUploadModal, setShowUploadModal, showRecorderModal, setShowRecorderModal, userAudioBlob, setUserBlob)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


  
export default Chat;
