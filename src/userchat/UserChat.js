import React from 'react'
import './UserChat.css'

{/**settings for the userchat visibility and time and sequence of messages logic */}
function UserChat({nickName, time, date, lastMessage, img}){
    return(
        <div className='LeftMenuChat'>
            <div id="user" className="list-group-item list-group-item-action w-100">
                <div className="d-flex w-100 justify-content-between">
                </div>
                <span className="profileImage">
                    <img className="profileImage" src={img} alt="..."></img>
                </span>
                
                <span id="name">{nickName}</span>
                <span><small id="time" className="text-muted">{time} | {date}</small></span>
                <p><small id="lastMessage" className="text-muted">{lastMessage}</small></p>
            </div>
        </div>
    )
}

export default UserChat;
