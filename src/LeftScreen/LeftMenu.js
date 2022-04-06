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
                    <i class="bi bi-search"></i>
                    
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                    </form>*/}

                    <div className="list-group-item">
                        <span>Add a new chat</span>

                        <button className='button' onClick={addNewUser}>
                            <i id="clickicon" className="bi bi-person-plus"></i>
                        </button>
                        {/** 
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
    console.log("Param is: " + JSON.stringify(usermessages))
    var addUser = usermessages.map((message, key) => {
        return <div onClick={() => setUserChat(message.user)}><UserChat name={message.user} time="3" key={key} /> </div>
    })
    return addUser;
}

// function chooseUserScreen(userName, newName){
//     userName.setUser(newName)
// }

export default LeftMenu;


// <div class="col-3 bg-light vh-100">
//     <ul class="list-group">


//         <li class="list-group-item d-flex justify-content-between align-items-center">
//             <i class="bi bi-messenger"></i>
//             <span>Noa Eitan</span>
//             <span class="badge bg-primary rounded-pill">14</span>
//         </li>
//         <li class="list-group-item d-flex justify-content-between align-items-center">
//             <i class="bi bi-messenger"></i>
//             <span>Hadar Ginatt</span>
//             <span class="badge bg-primary rounded-pill">2</span>
//         </li>
//         <li class="list-group-item d-flex justify-content-between align-items-center">
//             <i class="bi bi-messenger"></i>
//             <span>Eden</span>
//             <span class="badge bg-primary rounded-pill">1</span>
//         </li>
//         <li class="list-group-item d-flex justify-content-between align-items-center">
//             <i class="bi bi-messenger"></i>
//             <span> Gal</span>
//             <span class="badge bg-primary rounded-pill">1</span>
//         </li>
//     </ul>
// </div>

