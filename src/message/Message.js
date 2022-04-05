
import React, { useState } from 'react'



function Message({type,content,time, fromto}) {      
    return (
        <div>
       <p>{type}</p>
       <p>{content}</p>
       <p>{time}</p>
       <p>{fromto}</p>
    </div>

    );
}
  
export default  Message;
  