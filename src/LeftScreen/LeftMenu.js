import './LeftMenu.css'
import React, { useState } from 'react'
import UserChat from '../userchat/UserChat';
// import {Modal} from 'react-bootstrap';
// import 'react-bootstrap'


function addNewUser() {
    console.log("adding")
    var errorMessage = document.getElementById("errorMessage")
    errorMessage.innerHTML = ""
    var userName = document.getElementById("usernameInput").value
    if (userName === "" || userName === null) {
        var errorHtml = document.createElement('div')
        var message = "Pleae enter user name"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>"  + message + "</small></p>"
        errorMessage.append(errorHtml)
    }
}

function closeModal(){
    var errorMessage = document.getElementById("errorMessage")
    errorMessage.innerHTML = ""
}

// the messages that the user connected with


function LeftMenu({ nameConnected, myMessages, setUserChat }) {
    var [addUser, setaddUser] = useState(false);

    return (
        <div className="leftmenu">
            <div className='leftmenuheader'>
                <div class="search">
                    {/** 
                    <i className="bi bi-search"></i>
                    
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    </form>*/}
                    <button type="button" className="bi bi-person-plus sarch" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    </button>
                    <span className="justufy-center mb-3">{nameConnected}</span>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add a new chat</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <input id="usernameInput" className="form-control form-control-lg" type="text" placeholder="Enter user name"></input>
                                    <div id="errorMessage"></div>
                                    <br></br>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlFile1">add a new picture</label><br></br>
                                            <input type="file" className="form-control-file" id="exampleFormControlFile1"></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={function (e) { closeModal() }} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button onClick={function (e) { addNewUser() }} type="button" className="btn btn-primary">Add new chat</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="list-group-item">
                        {/** 
                        <span>Add a new chat</span>

                        <button className='button' onClick={addNewUser}>
                            <i id="clickicon" className="bi bi-person-plus"></i>
                        </button>
                        
                        <Modal show={addNewUser}>
                            <Modal.Body>
                                
                            </Modal.Body>
                        </Modal>
                        */}
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
        return <div onClick={() => setUserChat(message.user)}><UserChat name={message.user}
        time={message.message[(message.message).length - 1].time} lastMessage={message.message[(message.message).length - 1].content} key={key} /></div>
    })
    return addUser;
}



export default LeftMenu;


