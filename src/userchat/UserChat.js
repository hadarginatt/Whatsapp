import React from 'react'
import './UserChat.css'

{/**settings for the userchat visibility and time and sequence of messages logic */}
function UserChat({nickName, time, lastMessage, img}){
    return(
        <div className='LeftMenuChat'>
            <div id="user" className="list-group-item list-group-item-action w-100">
                <div className="d-flex w-100 justify-content-between">
                </div>
                <span className="profileImage">
                    <img src={img} alt="..."
                        style={{ width: "20%", height: "80%", borderRadius: "50%" }}
                    ></img>
                </span>
                
                <span id="name" className="mb-3">{nickName}</span>
                <span><small id="time" className="text-muted">{time}</small></span>
                <p><small id="lastMessage" className="text-muted">{lastMessage}</small></p>
            </div>
        </div>
    )
}

export default UserChat;
