
 import './App.css'
 import {BrowserRouter, Routes, Route} from 'react-router-dom'

//import logo from './logo.jpeg'
import Login from './login/Login'
import Register from './register/Register'
import Chat from './chat/Chat'
import users from './users.js'
import { useState } from 'react'
import databaseusers from './databaseusers'



function App() {

  var [nameConnected, setnameConnected] = useState('null')
  const setUserConnected = (newName) => {
    setnameConnected(newName)
  }
  
  var [dataBase, setDataBase] = useState(databaseusers)

  return (
    <div className="home">
      <div className="mainScreen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setUserConnected={setUserConnected} userName={nameConnected} dataBase={dataBase}/>}></Route>
            <Route path="/register" element={<Register dataBase={dataBase} setDataBase={setDataBase}/>}></Route>
            <Route path="/chat" element={<Chat nameConnected={nameConnected} dataBase={dataBase}/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
    
  );
}



export default App;
