import Logo from './logo.jpeg'
import './Chat.css'
import LeftMenu from '../LeftScreen/LeftMenu'
import databaseusers from '../databaseusers'
import React, { useState } from 'react'
import Message from '../message/Message'

function showScreen(username){
    //found the list of all chats of this person
    let usermessages = databaseusers.find((value) => { return value.username === "Hadar" }).messages;
    // console.log("from showScreen1:" + JSON.stringify(usermessages))
    // console.log(JSON.stringify(username))


    // TODO L if "" => show only logo
    var messagesFromUser = usermessages.find((value) => { return value.user === "Noa" }).message;
    console.log("from showScreen2:" + JSON.stringify(messagesFromUser))

    var showMessage = messagesFromUser.map((message, key) => {
        return <Message type={message.type} content={message.content} time={message.time} fromto={message.fromto} key ={key}/>})
    return showMessage;



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
        <div class="container-fluid" id="screen">
            <div id="chats" class="row">
                {/**side screen */}
                {/**the property param for the child */}
                <LeftMenu setUserChat={setUserChat}/>

                {/**main screen */}

                <div class="col-9">
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row g-2">
                        <div class="card">
                            <img src={Logo} class="card-img-top" alt="..."></img>
                        
                            {showScreen(user)}
                           
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
  
export default Chat;
  