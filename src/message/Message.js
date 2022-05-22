
import React, { useState } from 'react'
import './Massage.css'

{/*
displays the messges on the chats screen, and display the parameters according to the
sender (the user or the other chat member) , the message type and the current time.
**/}
function showMessage({content, time, date, sent}) {
    if(sent === "false") {
        return (
            <div className="messageLeft text">
                {/** text */}
                <span id="text">{content}</span><br></br>
                {/** time */}
                <span id="time">{time} | {date}</span>
            </div>
        )
    } else {
        return (
            <div className="messageRight text">
                {/** text */}
                <span id="text">{content}</span><br></br>
                {/** time */}
                <span id="time">{time} | {date}</span>
            </div>
        )
    }
}

function Message({content, created, sent}) { 
    var dateTime = new Date(created);
    var time = dateTime.getHours() + ":" + dateTime.getMinutes();
    var date = dateTime.getDate() + "." + dateTime.getMonth() + "." + dateTime.getFullYear();   
    return (
        (<div>
            {showMessage({content, time, date, sent})}
        </div>) 
    );
}
  
export default  Message;
  