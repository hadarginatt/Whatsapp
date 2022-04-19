
import React, { useState } from 'react'
import './Massage.css'


function showMessage({type,content,time, fromto}) {
    if (type === "text") {
        if(fromto === "to") {
            return (
                <div id="messageLeft">
                    {/** text */}
                    <span id="text">{content}</span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div id="messageRight">
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
                <div id="messageLeft">
                    {/** audio */}
                    <span id="text"><audio controls src={content}></audio></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div id="messageRight">
                    {/** audio */}
                    <span id="text"><audio controls src={content}></audio></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        }
    } else if (type === "image") {
        if(fromto === "to") {
            return (
                <div id="messageLeft">
                    {/** image */}
                    <span id="text"><img src={content}></img></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div id="messageRight">
                    {/** image */}
                    <span id="text"><img src={content}></img></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        }
    } else if (type === "video") {
        if(fromto === "to") {
            return (
                <div id="messageLeft">
                    {/** image */}
                    <span id="text"><video controls src={content}></video></span><br></br>
                    {/** time */}
                    <span id="time">{time}</span>
                </div>
            )
        } else {
            return (
                <div id="messageRight">
                    {/** image */}
                    <span id="text"><video controls src={content}></video></span><br></br>
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
  