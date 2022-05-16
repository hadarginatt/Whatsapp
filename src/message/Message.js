
import React, { useState } from 'react'
import './Massage.css'

{/*
displays the messges on the chats screen, and display the parameters according to the
sender (the user or the other chat member) , the message type and the current time.
**/}
function showMessage({content, created, sent}) {
    if(sent === "false") {
        return (
            <div className="messageLeft text">
                {/** text */}
                <span id="text">{content}</span><br></br>
                {/** time */}
                <span id="time">{created}</span>
            </div>
        )
    } else {
        return (
            <div className="messageRight text">
                {/** text */}
                <span id="text">{content}</span><br></br>
                {/** time */}
                <span id="time">{created}</span>
            </div>
        )
    }
}

function Message({content, created, sent}) {    
    return (
        (<div>
            {showMessage({content, created, sent})}
        </div>) 
    );
}
  
export default  Message;
  