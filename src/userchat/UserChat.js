import React from 'react'
import './UserChat.css'
import image1 from '../image1.jpeg'


function UserChat({name, time, lastMessage}){
    return(
        <div className='LeftMenuChat'>
            <div id="user" className="list-group-item list-group-item-action w-100">
                <div className="d-flex w-100 justify-content-between">
                </div>
                <span className="profileImage">
                    <img src={image1} alt="..."
                        style={{ width: "20%", height: "80%", borderRadius: "50%" }}
                    ></img>
                </span>
                
                <span id="name" className="mb-3">{name}</span>
                <span><small id="time" className="text-muted">{time}</small></span>
                

                {/**<p class="mb-1">Hello! Chat with me.</p>*/}
                <p><small id="lastMessage" className="text-muted">{lastMessage}</small></p>
            </div>
        </div>
    )
}

export default UserChat;

// <h5 class="mb-1">{userdetails.name}</h5>
// <small class="text-muted">{userdetails.time}</small>