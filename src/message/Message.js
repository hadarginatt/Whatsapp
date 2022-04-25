
import React, { useState } from 'react'
import './Massage.css'

{/*
displays the messges on the chats screen, and display the parameters according to the
sender (the user or the other chat member) , the message type and the current time.
**/}
function showMessage({type, content, time, date, fromto}) {
    if (type === "text") {
        if(fromto === "to") {
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

    } else if (type === "audio") {
        if(fromto === "to") {
            return (
                <div className="messageLeft audio">
                    {/** audio */}
                    <span><audio id="audio" controls src={content}></audio></span><br></br>
                    {/** time */}
                    <span id="time">{time} | {date}</span>
                </div>
            )
        } else {
            return (
                <div className="messageRight audio">
                    {/** audio */}
                    <span><audio id="audio" controls src={content}></audio></span><br></br>
                    {/** time */}
                    <span id="time">{time} | {date}</span>
                </div>
            )
        }
    } else if (type === "image") {
        if(fromto === "to") {
            return (
                <div class="messageLeft image">
                    {/** image */}
                    <span><img id="image" src={content}></img></span><br></br>
                    {/** time */}
                    <span id="time">{time} | {date}</span>
                </div>
            )
        } else {
            return (
                <div className="messageRight image">
                    {/** image */}
                    <span><img id="image" src={content}></img></span><br></br>
                    {/** time */}
                    <span id="time">{time} | {date}</span>
                </div>
            )
        }
    } else if (type === "video") {
        if(fromto === "to") {
            return (
                <div className="messageLeft video">
                    {/** video */}
                    <span><video id="video" controls src={content}></video></span><br></br>
                    {/** time */}
                    <span id="time">{time} | {date}</span>
                </div>
            )
        } else {
            return (
                <div className="messageRight video">
                    {/** video */}
                    <span><video id="video" controls src={content}></video></span><br></br>
                    {/** time */}
                    <span id="time">{time} | {date}</span>
                </div>
            )
        }
    }
}

function Message({type, content, time, date, fromto}) {    
    return (
        (<div>
            {showMessage({type, content, time, date, fromto})}
        </div>) 
    );
}
  
export default  Message;
  