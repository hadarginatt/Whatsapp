import './Chat.css'
import LeftMenu from '../LeftMenu/LeftMenu'
import React, { useState } from 'react'
import MainScreen from '../mainscreen/mainscreen'


function Chat({ nameConnected, dataBase }) {

    // security to the page.
    if (nameConnected === "" || nameConnected === "null") {
        window.location.replace("/")
    }

    // state of the user name that this user wants to talk to him, saved in the parent component.
    const [user, setUser] = useState('null');
    // function to inject to the child left menu.
    const setUserChat = (newName) => {
        setUser(newName)
    }

    //save the messages of my account.
    const [myMessages, setMyMessages] = useState(dataBase.find((value) => { return value.username === nameConnected }).messages);

    return (
        <div>
            <div className="row flex-row" id="header"><p id="namePage">Chats</p></div>
            <div className="container-fluid" id="screen">
                <div id="chats" className="row card flex-row">
                    {/**side screen */}
                    {/**the property param for the child */}
                    <div id="leftMenuchat" className='col-3'>
                        <LeftMenu nameConnected={nameConnected} setUserChat={setUserChat} myMessages={myMessages} setMyMessages={setMyMessages} dataBase={dataBase} />
                        </div>
                    {/**main screen */}
                    <div id="mainScreen" className="col d-flex card flex-column">
                    <MainScreen user={user} dataBase={dataBase} myMessages={myMessages} setMyMessages={setMyMessages} />
                    </div>
                </div>
            </div>
        </div>
    );

}




export default Chat;
