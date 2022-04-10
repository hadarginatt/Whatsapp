import Logo from './logo.jpeg'
import './Chat.css'
import LeftMenu from '../LeftScreen/LeftMenu'
import databaseusers from '../databaseusers'
import React, { useState } from 'react'
import Message from '../message/Message'
import { useLocation } from 'react-router-dom';
import Recorder from '../recorder/Recorder'





function showChat(username, myMessages){
    if (username === "" || username === "null") {
        // show only logo
        return (<img id="startImg" src={Logo} className="card-img-top" alt="..."></img>)
    } else {

        var messagesFromUser = myMessages.find((value) => { return value.user === username }).message;
        // console.log("from showScreen2:" + JSON.stringify(messagesFromUser))

        var showMessage = messagesFromUser.map((message, key) => {
            return <div className="messages"><Message type={message.type} content={message.content} time={message.time} fromto={message.fromto} key={key} /></div>
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

    // setMessages(myMessages.concat([]))


    //insert into the state of the data the 
    document.getElementById("newMessage").value = "";
}

function showTypeArea(username, myMessages, setMessages){

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
                {/** attach button*/}
                <button className='button' onClick={() => { }}>
                    <i className="bi bi-paperclip"></i>
                </button>
                {/** recording button*/}

                <button className='button'>
                    <Recorder addToDbFunc={addNewAudioMessage} username={username} myMessages={myMessages} setMessages={setMessages}/>
                </button>
            </div>
        )
    }
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


function showUserProfile(username){
    if (username === "" || username === "null") {
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

function Chat({ nameConnected }) {
    
    // security to the page
    if (nameConnected === "" || nameConnected === "null") {
        window.location.replace("/")
    }


    // state of the user name that this user wants to talk to him, saved in the parent component

    const [user, setUser] = useState('null');
    // function to inject to the chikd left menu
    const setUserChat = (newName) => {
        setUser(newName)
    }
    

    //save the messages of my account
    const [myMessages, setMyMessages] = useState(databaseusers.find((value) => { return value.username === nameConnected }).messages);
    console.log("messages:" + JSON.stringify(myMessages))

    return (
        <div className="container-fluid" id="screen">
            <div id="chats" className="row">
                {/**side screen */}
                {/**the property param for the child */}
                <div id="leftMenu" className='col-3'>
                    <div>{nameConnected}</div>
                    <LeftMenu nameConnected={nameConnected} setUserChat={setUserChat} myMessages={myMessages} setMyMessages={setMyMessages} />
                </div>

                {/**main screen */}

                <div id="mainScreen" className="col-9">
                    <div className="row card">
                        {showUserProfile(user)}
                        {showChat(user, myMessages)}
                        {showTypeArea(user, myMessages, setMyMessages)}
                    </div>
                </div>
            </div>
        </div>
    );

}


  
export default Chat;
