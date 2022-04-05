import './Register.css'
import databaseusers from '../databaseusers';

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function isValid(){
    // check if pass and confirmation is equal
    //not empty
    //only strings
    //have img
    return true;
}



function Register() {
    
    const [file, setFile] = useState();
    //created a path to the location by navigae 
    const shareDataBaseUsers = useNavigate()

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    function Upload(){
        if (isValid){
            var name = document.getElementById("inputUserName").value;
            var pass = document.getElementById("inputPassword").value;
            var pass2 = document.getElementById("inputPassword2").value;
            var nickname = document.getElementById("inputNickname").value;
            var img = document.getElementById("inputimg").value;
    
            //itay:
            // new user
            let user = {
                name: name,
                nickname: nickname,
                pass: pass,
                imgSrc: img
            }
            console.log(user)
            // //change the  locations state of login (now iys null)
            // shareNewUser('/', {state: user})
    // now we have a new user dictionary as state instead of null
            //save photo

            
             // shareDataBaseUsers('/', {state: user})

             //add the user to database
            console.log(databaseusers)
            databaseusers.push({username: name, password: pass})
            console.log(databaseusers)

             
             //change the  locations state of login (now iys null)
            shareDataBaseUsers('/', {state: databaseusers})
            // shareDataBaseUsers('/chat', {state: databaseusers})

    
        } else {
            console.log("not valid")
        }
    }

  return (
      <div id="registerForm" className="offset-2">
          <form className="row g-3">
              <div className="col-md-10">
                  <div>
                      <label htmlfor="inputEmail4" className="form-label">User Name</label>
                      <input type="text" className="form-control" id="inputUserName" placeholder="Israel Israeli"></input>              </div>
              </div>
              <div className="col-md-5">
                  <label htmlfor="inputPassword4" className="form-label">Password</label>
                  <input type="password" className="form-control" id="inputPassword"></input>
              </div>
              <div className="col-md-5">
                  <label htmlfor="inputPassword5" className="form-label">Verify Password</label>
                  <input type="password" className="form-control" id="inputPassword2"></input>
              </div>
              <div className="col-md-10">
                  <label htmlfor="inputAddress" className="form-label">Nickname</label>
                  <input type="text" className="form-control" id="inputNickname" placeholder="Israel Israeli"></input>
              </div>

              <div className="App">
                  <label htmlfor="inputAddress" className="form-label">Profile Picture</label>
                  <br></br>
                  <input id="inputimg" type="file" onChange={handleChange} />
                  <img src={file} />
              </div>


              <div className="col form-floating">
                  <p>Already registered? <a href='/'>Click here</a> to Login</p>
              </div>
              <div className="col-12" id="buttenSignIn">
                  <button onClick={Upload} type="button" className="btn btn-primary">Sign in</button>
              </div>
          </form>
      </div>
  );
}


export default Register;
