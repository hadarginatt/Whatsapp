import './Chat.css'
import LeftMenu from '../LeftMenu/LeftMenu'
import React, { useState } from 'react'
import Message from '../message/Message'
import Recorder from '../recorder/Recorder'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import logo2 from '../chat/logo2.jpeg'
import logo from '../chat/logo.jpeg'


{/**function for the chat visibiliy in the enter to the page -
if the user did not press on any chat yet - logo is displayed.
else- representing the relavant chat in the main screen. 
 */}
function showChat(username, myMessages) {
    if (username === "" || username === "null") {
        // show only logo.
        return;
        // show the relevant chat.
    } else {
        var messagesFromUser = myMessages.find((value) => { return value.user === username }).message;

        var showMessage = messagesFromUser.map((message, key) => {
            return <Message type={message.type} content={message.content} time={message.time} fromto={message.fromto} key={key} />
        })

        return showMessage;
    }
}

{/**function for adding the new message to the local data base. 
 */}
function sendNewMessage(username, myMessages, setMessages) {
    //get the new message.
    if (username === "null" || username === "" || document.getElementById("newMessage") === null) {
        return;
    }

    var content = document.getElementById("newMessage").value;
    if (content === "" || content === null) {
        return;
    } else {
        // insert into the local database.
        var type = "text";
        var time = getTime();
        var fromto = "to";
        var newMessage = { type, content, time, fromto };

        //insert into local data the new data.

        var newUserMessages = myMessages;
        newUserMessages = newUserMessages.find((value) => { return value.user === username }).message;
        newUserMessages.push(newMessage);
        var newM = myMessages;
        newM[username] = newUserMessages;
        setMessages(newM.concat([]));
        //insert into the state of the data.
        document.getElementById("newMessage").value = "";
    }
}
{/**function for adding a new recording messagae. 
 */}
function addNewAudioMessage(username, myMessages, setMessages, userAudioBlob, setUserBlob, setShowRecorderModal) {
    var alertMessage = document.getElementById('alert');
    alertMessage.innerHTML = ""
    if (userAudioBlob === "null") {
        var errorHtml = document.createElement('div')
        var message = "Please record first"
        errorHtml.innerHTML = "<p><small id='noBlob' className='errorMessage'>" + message + "</small></p>"
        alertMessage.append(errorHtml)
        return
    }
    // insert into the local database.
    var type = "audio";
    var content = userAudioBlob;
    var time = getTime();
    var fromto = "to";
    var newMessage = { type, content, time, fromto };

    //insert into local data the new data.
    var newUserMessages = myMessages;
    newUserMessages = newUserMessages.find((value) => { return value.user === username }).message;
    newUserMessages.push(newMessage);
    var newM = myMessages;
    newM[username] = newUserMessages;
    setMessages(newM.concat([]));

    //set the audio blob to null
    setUserBlob("null");

    //close modal
    setShowRecorderModal(false);
}

{/**function for adding a new image or video messagae. 
 */}
function addNewImageOrVideo(username, myMessages, setMessages, input, type) {
    // insert into the local database.
    var content = input;
    var time = getTime();
    var fromto = "to";
    var newMessage = { type, content, time, fromto };

    //insert into local data the new data.
    //console.log("before in adding image:" + JSON.stringify(myMessages));
    var newUserMessages = myMessages;
    newUserMessages = newUserMessages.find((value) => { return value.user === username }).message;
    newUserMessages.push(newMessage);
    var newM = myMessages;
    newM[username] = newUserMessages;
    setMessages(newM.concat([]));
    //console.log("after image:" + JSON.stringify(myMessages))
}
{/**function for the opening modal operation and file attachment. 
 */}
function showModal(setShowUploadModal) {
    setShowUploadModal(true)
}
{/**function for the closing modal operation.
 */}
function closeModal(setShowUploadModal) {
    setShowUploadModal(false)
}

{/**display the input area for the messages. inlculde sending text, record and attach video/image messages.
 */}
function showTypeArea(username, myMessages, setMessages, showUploadModal, setShowUploadModal, showRecorderModal, setShowRecorderModal, userAudioBlob, setUserBlob) {

    if (username === "" || username === "null") {
        return;
    } else {
        return (

            <div id="inputArea" className="input-group mb-3">
                <div className="input-group-prepend">

                    <button onClick={function (e) { sendNewMessage(username, myMessages, setMessages) }} id="sendMessage">
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
                <input type="username" className="form-control" id="newMessage" placeholder="New Message..."></input>
                <button id="addFileMessage" type="button" className="bi bi-paperclip" onClick={function (e) { showModal(setShowUploadModal) }}>
                </button>

                {/** send image or video modal */}
                <Modal show={showUploadModal}>
                    <Modal.Header>
                        <h5 className="modal-title" id="exampleModalLabel">Upload Image Or Video</h5>
                        <button onClick={function (e) { closeModal(setShowUploadModal) }} type="button" className="btn-close"></button>
                    </Modal.Header>
                    <Modal.Body>
                        <label>
                        <label htmlFor="inputAddress" className="form-label">Press to choose</label>
                        <input hidden={true} id="uploadFile" type="file" name="image" />
                        <i id="uploadImage" class="bi bi-upload"></i>
                        </label>
                        <div id="emptyChoose" className="errorMessage"></div>
                        <div id="wrongChoose" className="errorMessage"></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={function (e) { uploadImgOrVideo(username, myMessages, setMessages, setShowUploadModal); }} type="button" className="btn btn-primary">Upload</button>
                    </Modal.Footer>
                </Modal>

                {/** Recording Modal */}
                <Modal show={showRecorderModal}>
                    <Modal.Header>
                        <h5 className="modal-title">Record</h5>
                        <button onClick={function (e) { closeModal(setShowRecorderModal) }} type="button" className="btn-close"></button>
                    </Modal.Header>
                    <Modal.Body>
                        <Recorder setUserBlob={setUserBlob} />
                        <div id="alert"></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={function (e) {
                            addNewAudioMessage(username, myMessages, setMessages, userAudioBlob, setUserBlob, setShowRecorderModal);
                        }} type="button" className="btn btn-primary">Upload</button>
                    </Modal.Footer>
                </Modal>

                {/** recording button*/}
                <button id="recordButton" onClick={function (e) { setShowRecorderModal(true) }}>  <i className="bi bi-mic-fill"></i> </button>

            </div>
        )
    }
}


{/**function for the uploading of the image and video messages 
 */}
function uploadImgOrVideo(username, myMessages, setMessages, setShowUploadModal) {
    if (isValidImgVideo()) {
        // enter into database.
        var input = URL.createObjectURL(document.getElementById('uploadFile').files[0])
        let images = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
        let ends = document.getElementById('uploadFile').files[0].type;
        var type;
        if (images.indexOf(ends) > -1) {
            type = "image"
        } else {
            type = "video"
        }
        addNewImageOrVideo(username, myMessages, setMessages, input, type);
        // close the modal.
        closeModal(setShowUploadModal);
    }
}

{/**function for the image and video messages validy check.
if the file attached is not valid - user should pick a new file. 
 */}
function isValidImgVideo() {
    var flagIsValid = true;
    var flag = true
    var noChoose = document.getElementById("emptyChoose");
    var invalidChoose = document.getElementById("wrongChoose");
    noChoose.innerHTML = ""
    invalidChoose.innerHTML = ""

    // check if not empty.
    var fileName = document.getElementById("uploadFile").value;


    if (fileName.length === 0) {
        flag = false
        var errorHtml = document.createElement('div')
        var message = "Please choose image or video"
        errorHtml.innerHTML = "<p><small id='noImgOrVideo' className='errorMessages'>" + message + "</small></p>"
        noChoose.append(errorHtml)
        return flag;
    }

    var indexEnd = fileName.lastIndexOf(".") + 1;
    var endOfFile = fileName.substr(indexEnd, fileName.length).toLowerCase();
    //console.log(fileName);
    //image validatoin.
    let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    let type = document.getElementById('uploadFile').files[0].type;



    if (allowedExtension.indexOf(type) == -1) {
        flagIsValid = false;

    }
    //video vaidation
    else if (allowedExtension.indexOf(type) != -1) {
        flagIsValid = true;
        return flagIsValid;
    }

    if (endOfFile == "avi" || endOfFile == "mvk" || endOfFile == "mp4") {
        flagIsValid = true;
        return flagIsValid;
    }

    flagIsValid = false;
    var errorHtml = document.createElement('div')
    var message = "wrong type of image or video"
    errorHtml.innerHTML = "<p><small id='invalidImageOrVideo' className='errorMessages'>" + message + "</small></p>"
    invalidChoose.append(errorHtml);
    return flagIsValid;

}


//represents the current time when sending a new message.
function getTime() {
    var today = new Date();
    var hours = today.getHours()
    if (hours < 10) {
        hours = "0" + hours
    }
    var minutes = today.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var time = hours + ":" + minutes;
    return time;
}


function showUserProfile(username, dataBase) {
    if (username === "" || username === "null") {
        return;
    } else {
        var nickName = dataBase.find((value) => { return value.username === username }).nickName
        var img = dataBase.find((value) => { return value.username === username }).img
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

function Chat({ nameConnected, dataBase }) {

    // security to the page.
    if (nameConnected === "" || nameConnected === "null") {
        window.location.replace("/")
    }

    //state of audio recording content.
    const [userAudioBlob, setUserBlob] = useState('null');


    // state of the user name that this user wants to talk to him, saved in the parent component.
    const [user, setUser] = useState('null');
    // function to inject to the child left menu.
    const setUserChat = (newName) => {
        setUser(newName)
    }
    const [showUploadModal, setShowUploadModal] = useState(false);
    var [showRecorderModal, setShowRecorderModal] = useState(false);


    //save the messages of my account.
    const [myMessages, setMyMessages] = useState(dataBase.find((value) => { return value.username === nameConnected }).messages);
    //console.log("messages:" + JSON.stringify(myMessages))

    return (
        <div>
            <div className="row" id="header"><img src={logo}></img><p id="namePage">Chats</p></div>
            <div className="container-fluid" id="screen">
                <div id="chats" className="row row-lg-12 row-md-12 row-sm-12">
                    {/**side screen */}
                    {/**the property param for the child */}
                    <div id="leftMenuchat" className='col-xxl-3 col-xl-3 col-md-3 col-sm-3'>
                        <LeftMenu nameConnected={nameConnected} setUserChat={setUserChat} myMessages={myMessages} setMyMessages={setMyMessages} dataBase={dataBase} />
                    </div>

                    {/**main screen */}
                    <div id="mainScreen" className="col-xxl-9 col-xxl-9 col-xl-9 col-md-8 col-sm-9">
                        {mainScreen(user, dataBase, myMessages, setMyMessages, showUploadModal, setShowUploadModal, showRecorderModal,
                            setShowRecorderModal, userAudioBlob, setUserBlob)}
                    </div>
                </div>
            </div>
        </div>
    );

}


function mainScreen(user, dataBase, myMessages, setMyMessages, showUploadModal, setShowUploadModal, showRecorderModal,
    setShowRecorderModal, userAudioBlob, setUserBlob) {
    if (user === "" || user === "null") {
        // show only logo
        return (<img id="startImg" src={logo2} className="card-img-top" alt="..."></img>)
    } else {
        return (
            <div >
                {showUserProfile(user, dataBase)}
                <div id="chat" className="row card">
                    {showChat(user, myMessages)}
                </div>
                <div id="screenLimit">
                    {showTypeArea(user, myMessages, setMyMessages, showUploadModal, setShowUploadModal, showRecorderModal, setShowRecorderModal, userAudioBlob, setUserBlob)}
                </div>
            </div>
        )
    }

}



export default Chat;
