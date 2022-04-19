
import React, { useState } from 'react'
import './Massage.css'

{/*
displays the messges on the chats screen, and display the parameters according to the
sender (the user or the other chat member) , the message type and the current time.
**/}
function showMessage({type,content,time, fromto}) {
    if (type === "text") {
        if(fromto === "to") {
            return (
                <div class="messageLeft text">
                    {/** text */}
                    <span id="text">{content}</span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div class="messageRight text">
                    {/** text */}
                    <span id="text">{content}</span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        }

    } else if (type === "audio") {
        if(fromto === "to") {
            return (
                <div class="messageLeft audio">
                    {/** audio */}
                    <span><audio id="audio" controls src={content}></audio></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div class="messageRight audio">
                    {/** audio */}
                    <span><audio id="audio" controls src={content}></audio></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
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
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div class="messageRight image">
                    {/** image */}
                    <span><img id="image" src={content}></img></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        }
    } else if (type === "video") {
        if(fromto === "to") {
            return (
                <div class="messageLeft video">
                    {/** video */}
                    <span><video id="video" controls src={content}></video></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div class="messageRight video">
                    {/** video */}
                    <span><video id="video" controls src={content}></video></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        }
    }
}

function Message({type,content,time, fromto}) {    
    return (
        (<div>
            {showMessage({type,content,time, fromto})}
        </div>) 
    );
}
  
export default  Message;
  