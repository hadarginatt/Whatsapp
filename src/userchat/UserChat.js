import React from 'react'
import './UserChat.css'

function UserChat(){
    return(
        <div className='LeftMenuChat'>
            <div class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Noa Eitan</h5>
                    <small class="text-muted">3 days ago</small>
                </div>
                {/**<p class="mb-1">Hello! Chat with me.</p>*/}
                <small class="text-muted">bla.</small>
            </div>
        </div>
    )

}

export default UserChat;