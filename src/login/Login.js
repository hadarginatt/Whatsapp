import './Login.css'
import { useLocation, useNavigate} from 'react-router-dom';
import React, { useState } from "react";
import {checkIfUserInDB, rateURL} from '../databaseusers'



{/**
the function checks that all user parameters inserted correctly in the Login form.
 */}
 async function isValidLogin(setUserConnected, userName, navigate,Answer, setAnswer) {
    var name = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    alertPlaceholder.innerHTML = ""

    //in case of empty fields username or password popup alert message.
    if (name == "" || name == null || pass == "" || pass == null) {
        var wrapper = document.createElement('div')
        var type = 'warning'
        var message = 'Oops!! Empty fields! Please enter user name and password.'
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    }
     //in case all login parameters are valid. 
    var feedback = await checkIfUserInDB(name, pass,Answer, setAnswer);
   
       if(feedback == true){
        // change the state of the name to connected.
        setUserConnected(name);
        // go to the chat page.
        navigate('/chat', { state: userName })
       }
        //in case that username or password are invalid.
     if (feedback == false) {
        var wrapper = document.createElement('div')
        var type = 'warning'
        var message = 'Oops!! User name or Password invalid.'
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    }
}


{/**
returns the Login page and fields for input for dispaly.
 */}
function Login({ setUserConnected, userName }) {
    // the way to acces the location sharedData.
    const sharedData = useLocation();
    const navigate = useNavigate()
    const [Answer, setAnswer] = useState(null);
  
    return (
        <div id="page">
            <header>
                <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                    <div class="container-fluid">
                        <a class="navbar-brand" href={rateURL}>Rate Us</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>
            </header>
            <div className="row flex-row" id="headerLogin"><p id="namePageLogin">Login</p></div>
            <div id="inputsLogin" className="container-fluid">
                <div className="row col-4 offset-4 ">
                    <div className="form-floating mb-3">
                        <input type="username" className="form-control" id="userName" placeholder="Isreal Israeli"></input>
                        <label htmlFor="floatingInput">User Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Password"></input>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating">
                        {/** switch to the register page in case of a new user login */}
                        <p>Not registered? <a href="/register">Click here</a> to register</p>
                    </div>
                    <div id="liveAlertPlaceholder"></div>
                    {/**checks if the login is valid*/}
                    <button onClick={async () => { await isValidLogin(setUserConnected, userName, navigate, Answer, setAnswer) }} type="button"
                        className="btn btn-primary" id="liveAlertBtn">Login</button>
                </div>
            </div>
        </div>
    );
}
 
export default Login;
 