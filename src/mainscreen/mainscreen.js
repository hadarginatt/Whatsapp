import './mainscreen.css'
import Message from '../message/Message'
import Recorder from '../recorder/Recorder'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import logo2 from '../chat/logo2.jpeg'
import { useEffect, useRef, useState } from 'react';
import {updateMessages, getNickName, getNameConnected, getNickNameContact} from '../databaseusers'


function MainScreen({ nameConnected, user, dataBase, myMessages, setMyMessages, nickNameUserChat }) {
    
    useEffect(async () => {
        updateMessages(nameConnected, setMyMessages)
    }, []);

    //set the scroll of the chat to be always at the last message
    useEffect(() => {
        if (user != "" && user != "null") {
            var x = document.getElementById('chat')
            x.scrollTop = x.scrollHeight;
        }
        
    });

    if (user === "" || user === "null") {
        // show only logo
        return (<img id="startImg" src={logo2} className="card-img-top" alt="..."></img>)
    } else {
        return (
            <div id="main" className="col">
                {showUserProfile(user, nickNameUserChat)}
                
                <div id="chat" className="row d-flex flex-column card">
                {showChat(user, myMessages)}
                </div>

                <div id="screenLimit" className="row d-flex card flex-row">
                {showTypeArea(user, myMessages, setMyMessages)}
                </div>

            </div>
        )
    }
}



function showUserProfile(username, nickNameUserChat) {
    if (username === "" || username === "null") {
        return;
    } else {
        // var img = dataBase.find((value) => { return value.username === username }).img
        return (
            <div id="userNameChat" className="row card d-flex flex-row">
                <div className="card-body">{/** 
                    <img id="imgUserChat" src={img}></img>*/}
                    {nickNameUserChat}
                    
                </div>
            </div>
        )
    }
}



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
    console.log(username);
    var messagesFromUser = myMessages.find((value) => { return value.username === username });
    console.log("from show chat:", messagesFromUser);
    if (messagesFromUser === undefined) {
        return;
    }
    messagesFromUser = messagesFromUser.messages;
    var showMessage = messagesFromUser.map((message, key) => {
        return <Message content={message.content} created={message.created} sent={message.sent} key={key} />
    })
    return showMessage;
    }
}


{/**display the input area for the messages. inlculde sending text, record and attach video/image messages.
 */}
 function showTypeArea(username, myMessages, setMessages) {

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
            </div>
        )
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
        var time = "12:00"
        var date = "12:00"
        //var date = getDate();
        var fromto = "to";

        // INSERT INTO DB !!!!!!! WITH FETCH !!!!
        var newMessage = { type, content, time, date, fromto };

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


{/**represents the current time when sending a new message.
 */}
// function getTime() {
//     var today = new Date();
//     var hours = today.getHours()
//     if (hours < 10) {
//         hours = "0" + hours
//     }
//     var minutes = today.getMinutes()
//     if (minutes < 10) {
//         minutes = "0" + minutes;
//     }
//     var time = hours + ":" + minutes;
//     return time;
// }

{/**represents the current date when sending a new message.
 */}
// function getDate() {
//     var today = new Date();
//     var day = today.getDate()
//     if (day < 10) {
//         day = "0" + day
//     }
//     var month = today.getMonth() + 1
//     if (month < 10) {
//         month = "0" + month;
//     }
//     var date = day + "/" + month + "/" + today.getFullYear();

//     return date;
// }
export default MainScreen;