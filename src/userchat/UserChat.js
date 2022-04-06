import React from 'react'
import './UserChat.css'
import image1 from '../image1.jpeg'


function UserChat({name, time}){
    return(
        <div className='LeftMenuChat'>
            <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                </div>
                <div  className="profileImage">
                <img src={image1} alt="..."
                style={{width: "100%", height: "100%", borderRadius: "50%"}}
                ></img>
                </div>
                    <h5 className="mb-1">{name}</h5>
                    <small className="text-muted">{time}</small>
             
                {/**<p class="mb-1">Hello! Chat with me.</p>*/}
                <small className="text-muted">Chat with me.</small>
            </div>
        </div>
    )

}

export default UserChat;

// <h5 class="mb-1">{userdetails.name}</h5>
// <small class="text-muted">{userdetails.time}</small>