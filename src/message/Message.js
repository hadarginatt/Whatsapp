
import React, { useState } from 'react'
import './Massage.css'


function showMessage({type,content,time, fromto}) {
    console.log("inside single nessage")
    if (type === "text") {
        console.log("inside text")
        if(fromto === "from") {
            console.log("from")
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

    } else if (type === "video") {

    } else {

    }
}

function Message({type,content,time, fromto}) {    
    console.log("inside message")  
    console.log("the type is" + JSON.stringify(type))
    return (
        <div>
            {showMessage({type,content,time, fromto})}
        </div>

    );
}
  
export default  Message;
  