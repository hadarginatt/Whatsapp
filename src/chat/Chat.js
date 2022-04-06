import Logo from './logo.jpeg'
import './Chat.css'
import LeftMenu from '../LeftScreen/LeftMenu'
import databaseusers from '../databaseusers'
import React, { useState } from 'react'
import Message from '../message/Message'


function showChat(username){

    if (username === "" || username === null) {
        // show onlu logo
        return (<img src={Logo} className="card-img-top" alt="..."></img>)
        
    } else {
        //found the list of all chats of this person
        let usermessages = databaseusers.find((value) => { return value.username === "Hadar" }).messages;
        // console.log("from showScreen1:" + JSON.stringify(usermessages))
        // console.log(JSON.stringify(username))

        var messagesFromUser = usermessages.find((value) => { return value.user === username }).message;
        console.log("from showScreen2:" + JSON.stringify(messagesFromUser))

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
                    <i class="bi bi-send-fill"></i>
                </div>
                <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
                {/** attach buttom*/} 
                <i class="bi bi-paperclip"></i>
                {/** recording buttom*/} 
                <i class="bi bi-mic-fill"></i>
            </div>
        )
    }
}

function showUserProfile(username){
    if (username === "" || username === null) {
        return;
    } else {
        return (
            <div class="card">
                <div class="card-body">
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

                <div className="col-9">
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
