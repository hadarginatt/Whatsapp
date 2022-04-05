import Logo from './logo.jpeg'
import './MainScreen.css'
import Chat from '../chat/Chat'
import databaseusers from '../databaseusers'
import React, { useState } from 'react'



function MainScreen() {
    console.log("from chat")
    console.log(databaseusers)
    // parent has a state name user
    const [user, setUser] = useState('');
    //function to inject to the chikd left menu
    const setUserChat = (newName) => {
        setUser(newName)
        console.log(newName)
    }
    

    return (
        <div class="col-9">
        <div class="row"></div>
        <div class="row"></div>
        <div class="row g-2">
            <div class="card">
                <img src={Logo} class="card-img-top" alt="..."></img>
            </div>
        </div>
    </div>

    );
}
  
export default MainScreen;
  