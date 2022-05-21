import './Chat.css'
import LeftMenu from '../LeftMenu/LeftMenu'
import React, { useState, useEffect } from 'react'
import MainScreen from '../mainscreen/mainscreen'
import {updateMessages, updateContacts, serverConnected} from '../databaseusers'
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';


function Chat({ nameConnected, dataBase , setDataBase}) {

    // security to the page.
    if (nameConnected === "" || nameConnected === "null") {
        window.location.replace("/")
    }

    //save the messages of my account.
    const [myMessages, setMyMessages] = useState([]);
    const [contacts, setContacts] = useState([])
    // state of the user name that this user wants to talk to him, saved in the parent component.
    const [user, setUser] = useState('null');

    // signalR
    const [ connection, setConnection ] = useState(null);
    useEffect(() => {
        updateContacts(nameConnected, setContacts)
        updateMessages(nameConnected, setMyMessages)
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5022/Hubs/MyHub', {skipNegotiation: true,
            transport: HttpTransportType.WebSockets})
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);
    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
                    connection.on('ChangedRecieved', function (username, server) {
                        console.log("change!");
                        console.log("u:", username);
                        console.log("s:", server);
                        if ((username == nameConnected) && (server == serverConnected)) {
                            updateContacts(nameConnected, setContacts);
                            updateMessages(nameConnected, setMyMessages);
                        }  
                    });
                })
                //.catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    
    // the nickname of the user that we talk with him
    const [nickNameUserChat, setNickNameUserChat] = useState("null");
    // function to inject to the child left menu.
    const setUserChat = (newName) => {
        setUser(newName)
    }
    
    // useEffect(async () => {
        
    // }, []);

    
    return (
        <div>
            <div className="row flex-row" id="header"><p id="namePage">Chats</p></div>
            <div className="container-fluid" id="screen">
                <div id="chats" className="row card flex-row">
                    {/**side screen */}
                    {/**the property param for the child */}
                    <div id="leftMenuchat" className='col-3'>
                        <LeftMenu nameConnected={nameConnected} setUserChat={setUserChat} myMessages={myMessages} setMyMessages={setMyMessages} setNickNameUserChat={setNickNameUserChat} contacts={contacts} setContacts={setContacts} connection={connection}/>
                    </div>

                    <div id="mainScreen" className="col d-flex card flex-column">
                        <MainScreen nameConnected={nameConnected} user={user} dataBase={dataBase} myMessages={myMessages} setMyMessages={setMyMessages} nickNameUserChat={nickNameUserChat} connection={connection} contacts={contacts} setContacts={setContacts}/>
                    </div>
                </div>
            </div>
        </div>
    );

}




export default Chat;
