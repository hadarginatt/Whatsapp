import Logo from './logo.jpeg'
import './Chat.css'
import LeftMenu from '../LeftScreen/LeftMenu'
import databaseusers from '../databaseusers'
import React, { useState } from 'react'
import Message from '../message/Message'

//save the messages of my account
var myMessages = databaseusers.find((value) => { return value.username === "Hadar" }).messages;


function showChat(username){
    if (username === "" || username === null) {
        // show onlu logo
        return (<img src={Logo} className="card-img-top" alt="..."></img>)
    } else {

        var messagesFromUser = myMessages.find((value) => { return value.user === username }).message;
        // console.log("from showScreen2:" + JSON.stringify(messagesFromUser))

        var showMessage = messagesFromUser.map((message, key) => {
            return <div className="messages"><Message type={message.type} content={message.content} time={message.time} fromto={message.fromto} key={key} /></div>
        })
        
        return showMessage;
    }

}

function showTypeArea(username){
    if (username === "" || username === null) {
        return;
    } else {
        return (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                {/**
                    <button onClick={sendNewMessage(username)} id="sendMessage">
                        <i className="bi bi-send-fill"></i>
                    </button>
                    */}
                 
                    <button id="sendMessage">
                        <i className="bi bi-send-fill"></i>
                    </button>
        
                   
                </div>
                <input type="username" className="form-control" id="newMessage" placeholder="New Message..."></input>
                {/** attach button*/} 
                 <button className='button' onClick={""}>
                <i className="bi bi-paperclip"></i>
                </button>
                {/** recording button*/}
                <button className='button' onClick={""}> 
                <i className="bi bi-mic-fill"></i>
                </button>
            </div>
        )
    }
}

function sendNewMessage(username){
    //get the new message
    console.log("booo")
    var content = document.getElementById("newMessage").value;
    if (content === "" || content === null){
        console.log("empty")
        return;
    } else {
        console.log("inside")
        // insert into the local database
        var type = "text"
        // change the time !!!!!!!!!! to real time!
        var time = "12:00"
        var fromto = "to"

        var newMessage = {type, content, time, fromto}
        myMessages.find((value) => { return value.user === username }).message.push(newMessage);
    }
}

function showUserProfile(username){
    if (username === "" || username === null) {
        return;
    } else {
        return (
            <div className="card">
                <div className="card-body">
                    {/**  TODO ::: Show the image of the user!!*/}
                    {username}
                </div>
            </div>
        )
    }
}

function Chat() {
    console.log("from chat")
    console.log(databaseusers)
    // parent has a state name user
    const [user, setUser] = useState('');
    //function to inject to the chikd left menu
    const setUserChat = (newName) => {
        setUser(newName)
        console.log(newName)
    }
    

    return (
        <div className="container-fluid" id="screen">
            <div id="chats" className="row">
                {/**side screen */}
                {/**the property param for the child */}
                <LeftMenu setUserChat={setUserChat}/>

                {/**main screen */}

                <div id="mainScreen" className="col-9">
                    <div className="row"></div>
                    <div className="row"></div>
                    <div className="row g-2">
                        <div className="card">
                            {showUserProfile(user)}
                            {showChat(user)}
                            {showTypeArea(user)}                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
  
export default Chat;
