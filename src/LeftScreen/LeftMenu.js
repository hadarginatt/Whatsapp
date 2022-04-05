import './LeftMenu.css'
import React from 'react'
import UserChat from '../userchat/UserChat';
import databaseusers from '../databaseusers';


function addNewUser(){
    console.log("adding")
}

// the messages that the user connected with
let usermessages = databaseusers.find((value) => { return value.username === "Hadar" }).messages;

function LeftMenu(){

    


    return(
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
                            <i id="clickicon" onClick={addNewUser} className="bi bi-person-plus"></i>
                    </div>
                </div>
            </div>
            <div className='leftmenuusers'>
                    {showUsers(usermessages)}


            </div>
        </div>
    );
}

function showUsers(usermessages){
    console.log("Param is: " + JSON.stringify(usermessages))
    usermessages.map((message, key) => {console.log('hadar: ' + message.user);
        return <UserChat name = {usermessages.user} time = "3" />})

}

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

