
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import Chat from './chat/Chat'
import { useState } from 'react'
import databaseusers from './databaseusers'



function App() {
{/** the state of the current connected users */}
  var [nameConnected, setnameConnected] = useState('null')
  const setUserConnected = (newName) => {
    setnameConnected(newName)
  }
{/** the state of the database for refreshment of the data*/}
  var [dataBase, setDataBase] = useState(databaseusers)


  return (
    <div className="home">
      <div className="mainScreen">
        {/** changing between the different pages (Login, Register and chat) via the browser router elemnt*/}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setUserConnected={setUserConnected} userName={nameConnected} dataBase={dataBase} />}></Route>
            <Route path="/register" element={<Register dataBase={dataBase} setDataBase={setDataBase} />}></Route>
            <Route path="/chat" element={<Chat nameConnected={nameConnected} dataBase={dataBase} />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  );
}


export default App;
