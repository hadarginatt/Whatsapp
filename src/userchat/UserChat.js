import React from 'react'
import './UserChat.css'

function UserChat({name, time}){
    return(
        <div className='LeftMenuChat'>
            <div className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{name}</h5>
                    <small className="text-muted">{time}</small>
                </div>
                {/**<p class="mb-1">Hello! Chat with me.</p>*/}
                <small className="text-muted">Chat with me.</small>
            </div>
        </div>
    )

}

export default UserChat;

// <h5 class="mb-1">{userdetails.name}</h5>
// <small class="text-muted">{userdetails.time}</small>