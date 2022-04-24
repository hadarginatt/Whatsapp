import './LeftMenu.css'
import React, { useState } from 'react'
import UserChat from '../userchat/UserChat';
import newUserImg from '../newUser.png'
import { Modal} from 'react-bootstrap';


{/**the function adds a new user to the left menu.
the new user is based on the hardcoded database only */}
function addNewUser(nameConnected, myMessages, setMyMessages, setUserChat, dataBase, setShowModalUser) {
   // console.log("adding")
    var errorMessage = document.getElementById("errorMessage")
    errorMessage.innerHTML = ""
    var userName = document.getElementById("usernameInput").value
    if (userName === "" || userName === null) {
        var errorHtml = document.createElement('div')
        var message = "Please enter user name"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        errorMessage.append(errorHtml)
        return
    }
    // check if the username is in the dataBase.
    var username = document.getElementById("usernameInput").value
    var userDetails = dataBase.find((value) => { return value.username === username })
    if (!userDetails) {
        var errorHtml = document.createElement('div')
        var message = "User name does not exist"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        errorMessage.append(errorHtml)
        return
    }
    // check if the username is not the user name that allready connected.
    if (nameConnected === username) {
        var errorHtml = document.createElement('div')
        var message = "You cannot add yourself"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        errorMessage.append(errorHtml)
        return
    }
    // check if the username is alleady exist in chats.
    if (myMessages.find((value) => { return value.user === username })) {
        var errorHtml = document.createElement('div')
        var message = "User is allready exists in chats"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        errorMessage.append(errorHtml)
        return
    }

    // adding the user to the database (to the messages of this user who connected).
    var addToDB = [{ user: username, message: [{}] }]
    setMyMessages(myMessages.concat(addToDB))
    //change the window of the chat to be the window with this new username.
    setUserChat(username)
    document.getElementById("usernameInput").value = ""
    setShowModalUser(false)

}


// the messages that the user connected with.
function LeftMenu({ nameConnected, myMessages, setUserChat, setMyMessages, dataBase }) {

    var img = dataBase.find((value) => { return value.username === nameConnected }).img
    var nickname = dataBase.find((value) => { return value.username === nameConnected }).nickName
    const [showModalAddUser, setShowModalUser] = useState(false)

    return (
        <div id="leftmenu" className="leftmenu d-flex card flex-column">
            <div className='leftmenuheader row d-flex flex-row card'>

                <div>
                    <button id="addUserButton" type="button" className="col btn-lg bi bi-person-plus sarch" onClick={function (e) { setShowModalUser(true) }}>
                    </button>
                    <img id="userImg" className="col" src={img} alt="..."></img>
                    <span id="nameConnected" className="col mb-3">{nickname}</span>
                </div>

                    {/** Add New User Modal */}

                    <Modal show={showModalAddUser}>
                        <Modal.Header>
                            <h5 className="modal-title" id="exampleModalLabel1">Add new chat</h5>
                            <button onClick={function (e) { setShowModalUser(false) }} type="button" className="btn-close"></button>
                        </Modal.Header>
                        <Modal.Body>
                            <input id="usernameInput" className="form-control form-control-lg" type="text" placeholder="Enter user name"></input>
                            <div id="errorMessage"></div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={function (e) { setShowModalUser(false) }} type="button" className="btn btn-secondary">Close</button>
                            <button onClick={function (e) { addNewUser(nameConnected, myMessages, setMyMessages, setUserChat, dataBase, setShowModalUser) }} type="button" className="btn btn-primary">Add new chat</button>
                        </Modal.Footer>
                    </Modal>
 
            </div>
            
 
            <div className='leftmenuusers row d-flex flex-column'>
                {showUsers(setUserChat, myMessages, dataBase)}
            </div>

        </div>
    );
}
// taking the setUserChat parameters.
function showUsers(setUserChat, myMessages, dataBase) {
    if (myMessages.length == 0) {
        return <div id="noUsers">No chats yet.</div>
    }
    var addUser = myMessages.map((message, key) => {
        var lastMessage = message.message[(message.message).length - 1].type
        if (lastMessage != null && lastMessage === "text") {
            lastMessage = message.message[(message.message).length - 1].content
            // if the message is longer than 20, slice it
            if (lastMessage.length > 20)
            lastMessage = lastMessage.slice(0, 20) + "..."
        }
        var name = message.user
        var time = message.message[(message.message).length - 1].time
        var userDetails = dataBase.find((value) => { return value.username === name })
        var img = newUserImg
        if (userDetails) {
            img = userDetails.img
        }
        var nickName = userDetails.nickName
        return <div onClick={() => setUserChat(message.user)} key={key}><UserChat nickName={nickName}
            time={time} lastMessage={lastMessage} img={img} key={key} /></div>
    })
    return addUser;
}




export default LeftMenu;


