import './LeftMenu.css'
import React, { useState, useEffect } from 'react'
import UserChat from '../userchat/UserChat';
import newUserImg from '../newUser.png'
import { Modal} from 'react-bootstrap';
import {updateMessages, updateContacts, getNickName, addUserToChat} from '../databaseusers'


{/**the function adds a new user to the left menu.
the new user is based on the hardcoded database only */}
async function addNewUser(setContacts, nameConnected, myMessages, setMyMessages, setUserChat, setShowModalUser, setNickNameUserChat, connection) {
    var errorMessage = document.getElementById("errorMessage")
    errorMessage.innerHTML = ""
    var userName = document.getElementById("usernameInput").value
    var nickName = document.getElementById("nicknameInput").value
    const server = document.getElementById("serverInput").value

    if (userName === "" || userName === null) {
        var errorHtml = document.createElement('div')
        var message = "Please enter user name"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        errorMessage.append(errorHtml)
        return
    }
    var username = document.getElementById("usernameInput").value
    // check if the username is not the user name that allready connected.
    if (nameConnected === username) {
        var errorHtml = document.createElement('div')
        var message = "You cannot add yourself"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        errorMessage.append(errorHtml)
        return
    }
    
    var result = await addUserToChat(nameConnected, setContacts, setMyMessages, username, "", nickName, server, setNickNameUserChat, setUserChat, connection)
    if (result === false) {
        var errorHtml = document.createElement('div')
        var message = "Oops. the user is not valid"
        errorHtml.innerHTML = "<p><small id='notValidUser' className='errorMessages'>" + message + "</small></p>"
        errorMessage.append(errorHtml)
        return;
    }
    document.getElementById("usernameInput").value = ""
    setShowModalUser(false)
}

// the messages that the user connected with.
function LeftMenu({ nameConnected, setUserChat, myMessages, setMyMessages, setNickNameUserChat, contacts, setContacts, connection}) {
    
    useEffect(async () => {
        updateContacts(nameConnected, setContacts)
        updateMessages(nameConnected, setMyMessages)
    }, []);
    
    const [showModalAddUser, setShowModalUser] = useState(false)

    return (

        <div id="leftmenu" className="leftmenu d-flex card flex-column">

            <div className='leftmenuheader row d-flex flex-row card'>
                <div>
                    <button id="addUserButton" type="button" className="col btn-lg bi bi-person-plus sarch" onClick={function (e) { setShowModalUser(true) }}>
                    </button>

                    <img id="userImg" className="col" src={newUserImg} alt="..."></img>

                    <span id="nameConnected" className="col mb-3">{getNickName()}</span>
                </div>


                {/** Add New User Modal */}

                <Modal show={showModalAddUser}>
                    <Modal.Header>
                        <h5 className="modal-title" id="exampleModalLabel1">Add new chat</h5>
                        <button onClick={function (e) { setShowModalUser(false) }} type="button" className="btn-close"></button>
                    </Modal.Header>
                    <Modal.Body>
                        <input id="nicknameInput" className="form-control form-control-lg" type="text" placeholder="Enter nickname"></input>
                        <input id="usernameInput" className="form-control form-control-lg" type="text" placeholder="Enter user name"></input>
                        <input id="serverInput" className="form-control form-control-lg" type="text" placeholder="Enter server address"></input>
                        <div id="errorMessage"></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={function (e) { setShowModalUser(false) }} type="button" className="btn btn-secondary">Close</button>
                        <button onClick={function (e) { addNewUser(setContacts, nameConnected, myMessages, setMyMessages, setUserChat, setShowModalUser, setNickNameUserChat, connection) }}
                        type="button" className="btn btn-primary">Add new chat</button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className='leftmenuusers row d-flex flex-column'>
                {showUsers(nameConnected, setUserChat, contacts, setContacts, setMyMessages, setNickNameUserChat)}
            </div>
        </div>
    );
}

function showUsers(nameConnected, setUserChat, contacts, setContacts, setMyMessages, setNickNameUserChat) {
    if (contacts.length === 0) {
        return <div id="noUsers">No chats yet.</div>
    }
    var addUser = contacts.map((contact, key) => {
        var lastMessage = contact.last;
        var name = contact.id;
        // split date and time of the message
        var time = getTime(contact.lastdate);
        var date = getDate(contact.lastdate);
        var img = newUserImg;
        var nickname = contact.name;
        return <div onClick={() => {setUserChat(contact.id); setNickNameUserChat(contact.name); updateMessages(nameConnected, setMyMessages); updateContacts(nameConnected, setContacts);}}
        key={key}><UserChat nickName={nickname} time={time} date={date} lastMessage={lastMessage}
        img={img} key={key} /></div>
    })
    return addUser;
}

{/**represents the current time when sending a new message.
 */}
function getTime(lastDate) {
    if (lastDate == null) {
        return null;
    }
    var dateTime = new Date(lastDate);
    var hours = dateTime.getHours();
    if (hours < 10) {
        hours = "0" + hours
    }
    var minutes = dateTime.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var time = hours + ":" + minutes;
    return time;
}

{/**represents the current date when sending a new message.
 */}
function getDate(lastDate) {
    if (lastDate == null) {
        return null;
    }
    var dateTime = new Date(lastDate);
    var day = dateTime.getDate();
    if (day < 10) {
        day = "0" + day
    }
    var month = dateTime.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + dateTime.getFullYear();

    return date;
}



export default LeftMenu;







