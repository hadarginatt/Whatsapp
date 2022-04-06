import './LeftMenu.css'
import React, { useState } from 'react'
import UserChat from '../userchat/UserChat';
import databaseusers from '../databaseusers';
// import {Modal} from 'react-bootstrap';
// import 'react-bootstrap'


function addNewUser({ userOnScreen }) {
    // setaddUser(true);
}

// the messages that the user connected with
let usermessages = databaseusers.find((value) => { return value.username === "Hadar" }).messages;

function LeftMenu({ setUserChat }) {
    var [addUser, setaddUser] = useState(false);

    return (
        <div className="leftmenu">
            <div className='leftmenuheader'>
                <div>
                    {/** 
                    <i className="bi bi-search"></i>
                    
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    </form>*/}
                    <button type="button" className="bi bi-person-plus" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add a new chat
                    </button>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add a new chat</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                <input className="form-control form-control-lg" type="text" placeholder="username"></input><br></br>
                                <form>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlFile1">add a new picture</label><br></br>
                                            <input type="file" className="form-control-file" id="exampleFormControlFile1"></input>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Add new chat</button>
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
                {showUsers(setUserChat, usermessages)}


            </div>
        </div>
    );
}
// taking the setUserChat param 
function showUsers(setUserChat, usermessages) {
    var addUser = usermessages.map((message, key) => {
        return <div onClick={() => setUserChat(message.user)}><UserChat name={message.user} time="3" key={key} /> </div>
    })
    return addUser;
}

// function chooseUserScreen(userName, newName){
//     userName.setUser(newName)
// }

export default LeftMenu;


// <div className="col-3 bg-light vh-100">
//     <ul className="list-group">


//         <li className="list-group-item d-flex justify-content-between align-items-center">
//             <i className="bi bi-messenger"></i>
//             <span>Noa Eitan</span>
//             <span className="badge bg-primary rounded-pill">14</span>
//         </li>
//         <li className="list-group-item d-flex justify-content-between align-items-center">
//             <i className="bi bi-messenger"></i>
//             <span>Hadar Ginatt</span>
//             <span className="badge bg-primary rounded-pill">2</span>
//         </li>
//         <li className="list-group-item d-flex justify-content-between align-items-center">
//             <i className="bi bi-messenger"></i>
//             <span>Eden</span>
//             <span className="badge bg-primary rounded-pill">1</span>
//         </li>
//         <li className="list-group-item d-flex justify-content-between align-items-center">
//             <i className="bi bi-messenger"></i>
//             <span> Gal</span>
//             <span className="badge bg-primary rounded-pill">1</span>
//         </li>
//     </ul>
// </div>

