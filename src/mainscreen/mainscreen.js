import './mainscreen.css'
import Message from '../message/Message'
import Recorder from '../recorder/Recorder'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import logo2 from '../chat/logo2.jpeg'
import newUserImg from '../newUser.png'
import { useEffect, useRef, useState } from 'react';
import {updateMessages, addNewMessage, updateContacts} from '../databaseusers'


function MainScreen({ nameConnected, user, dataBase, myMessages, setMyMessages, nickNameUserChat, connection, contacts, setContacts}) {
    
    useEffect(async () => {
        updateContacts(nameConnected, setContacts)
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
                {showTypeArea(user, setMyMessages, nameConnected, connection, setContacts)}
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
                <div className="card-body">
                    <img id="imgUserChat" src={newUserImg}></img>
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
    var messagesFromUser = myMessages.find((value) => { return value.username === username });
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
 function showTypeArea(username, setMessages, nameConnected, connection, setContacts) {

    if (username === "" || username === "null") {
        return;
    } else {
        return (
            <div id="inputArea" className="input-group mb-3">
                <div className="input-group-prepend">
                    <button onClick={function (e) { sendNewMessage(username, setMessages, nameConnected, connection, setContacts) }} id="sendMessage">
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
 async function sendNewMessage(username, setMessages, nameConnected, connection, setContacts) {
    //get the new message.
    if (username === "null" || username === "" || document.getElementById("newMessage") === null) {
        return;
    }

    var content = document.getElementById("newMessage").value;
    if (content === "" || content === null) {
        return;
    } else {
        // insert into the local database.
        addNewMessage(nameConnected, setMessages, username, content, connection, setContacts);
        document.getElementById("newMessage").value = "";
    }
}

export default MainScreen;