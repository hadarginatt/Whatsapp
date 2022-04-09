import './LeftMenu.css'
import React, { useState } from 'react'
import UserChat from '../userchat/UserChat';
import addUserImg from '../newUser.png'
// import {Modal} from 'react-bootstrap';
// import 'react-bootstrap'


function addNewUser(myMessages, setMyMessages, setUserChat) {
    console.log("adding")
    var errorMessage = document.getElementById("errorMessage")
    errorMessage.innerHTML = ""
    var userName = document.getElementById("usernameInput").value
    if (userName === "" || userName === null) {
        var errorHtml = document.createElement('div')
        var message = "Pleae enter user name"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>"  + message + "</small></p>"
        errorMessage.append(errorHtml)
        return
    }
    // adding the user to the database (to the messages of this user who connected)
    var username = document.getElementById("usernameInput").value

    // var addToDB = [{user: username, img: addUserImg, message: [{}]}]
    var addToDB = [{user: username, message: [{}]}]
    setMyMessages(myMessages.concat(addToDB))
    //change the window of the chat to be the window with this new username
    setUserChat(username)
    document.getElementById("usernameInput").value = ""
    // success message -> change the modal to be with success message
    // var succDivMess = document.getElementById("modalBody")
    // succDivMess.innerHTML = "<div id='succMess'>User name was added successfuly !</div>"
    // var succDivButton = document.getElementById("modalfotter")
    // succDivButton.innerHTML = "<button onClick={function (e) { closeModal() }} type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>"
    
}


function closeModal(){
    // set the modal's divs -> change the modal to be the original modal
    // var succDivMess = document.getElementById("modalBody")
    // succDivMess.innerHTML = "<input id='usernameInput' className='form-control form-control-lg' type='text' placeholder='Enter user name'></input><div id='errorMessage'></div>"
    // var divButton = document.getElementById("modalfotter")
    // divButton.innerHTML = "<button onClick={function (e) { closeModal() }} type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button><button onClick={function (e) { addNewUser(myMessages, setMyMessages, setUserChat) }} type='button' className='btn btn-primary'>Add new chat</button>"
    var errorMessage = document.getElementById("errorMessage")
    errorMessage.innerHTML = ""
    document.getElementById("usernameInput").value = ""
}

// the messages that the user connected with


function LeftMenu({ nameConnected, myMessages, setUserChat, setMyMessages }) {

    return (
        <div className="leftmenu">
            <div className='leftmenuheader'>
                <div class="search">
                    <button type="button" className="bi bi-person-plus sarch" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    </button>
                    <span className="justufy-center mb-3">{nameConnected}</span>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add new chat</h5>
                                    <button onClick={function (e) { closeModal() }} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div id="modalBody" className="modal-body">
                                    <input id="usernameInput" className="form-control form-control-lg" type="text" placeholder="Enter user name"></input>
                                    <div id="errorMessage"></div>
                                </div>
                                <div id="modalfotter" className="modal-footer">
                                    <button onClick={function (e) { closeModal() }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={function (e) { addNewUser(myMessages, setMyMessages, setUserChat) }} type="button" className="btn btn-primary">Add new chat</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="list-group-item">
                    </div>
                </div>
            </div>
            <div className='leftmenuusers'>
                {showUsers(setUserChat, myMessages)}


            </div>
        </div>
    );
}
// taking the setUserChat param 
function showUsers(setUserChat, myMessages) {
    var addUser = myMessages.map((message, key) => {
        var lastMessage= message.message[(message.message).length - 1].content
        if (lastMessage.match("blob")){
            lastMessage = "audio"
        }
        return <div onClick={() => setUserChat(message.user)}><UserChat name={message.user}
        time={message.message[(message.message).length - 1].time} lastMessage={lastMessage} key={key} /></div>
    })
    return addUser;
}




export default LeftMenu;


