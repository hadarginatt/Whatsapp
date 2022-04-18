
 import './App.css'
 import {BrowserRouter, Routes, Route} from 'react-router-dom'

//import logo from './logo.jpeg'
import Login from './login/Login'
import Register from './register/Register'
import Chat from './chat/Chat'
import users from './users.js'
import { useState } from 'react'
import Video from './video/Video'



function App({nameOfPage}) {

  var [nameConnected, setnameConnected] = useState('null')
  const setUserConnected = (newName) => {
    setnameConnected(newName)
  }

  return (

    <div className="home">
      <div className="nameOfPage">HadarNoaChat</div>
      <div>{nameConnected} is connected</div>
      <div className="mainScreen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setUserConnected={setUserConnected} userName={nameConnected}/>}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/chat" element={<Chat nameConnected={nameConnected} />}></Route>
            <Route path="/video" element={<Video />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    
  );
}



export default App;
