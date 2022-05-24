
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
    var time = getTime(created);
    var date = getDate(created); 
    return (
        (<div>
            {showMessage({content, time, date, sent})}
        </div>) 
    );
}


function getTime(lastDate) {
    if (lastDate == null) {
        return null;
    }
    var dateTime = new Date(lastDate);
    var hours = dateTime.getHours();
    if (hours < 10) {
        hours = "0" + hours
    }
    var minutes = dateTime.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var time = hours + ":" + minutes;
    return time;
}

{/**represents the current date when sending a new message.
 */}
function getDate(lastDate) {
    if (lastDate == null) {
        return null;
    }
    var dateTime = new Date(lastDate);
    var day = dateTime.getDate();
    if (day < 10) {
        day = "0" + day
    }
    var month = dateTime.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "/" + month + "/" + dateTime.getFullYear();

    return date;
}

  
export default  Message;
  