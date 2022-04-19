import './Login.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import databaseusers from '../databaseusers';
import { useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import logo from '../chat/logo.jpeg'



function isValidLogin(setUserConnected, userName, navigate) {
    var name = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    alertPlaceholder.innerHTML = ""
    if (name == "" || name == null || pass == "" || pass == null) {        
        var wrapper = document.createElement('div')
        var type = 'warning'
        var message = 'Oops!! Empty fields! Please enter user name and password.'
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    } else if (databaseusers.find((value) => { return value.username === name && value.password === pass })) {
        // change state of name connected
        setUserConnected(name);
        // go to chat
        navigate('/chat', {state: userName})


    } else {
        console.log("baaaaaaaaaaaaaaadd");
        var wrapper = document.createElement('div')
        var type = 'warning'
        var message = 'Oops!! User name or Password invalid.'
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    }
}



function Login({setUserConnected, userName, dataBase}) {
    // the way to acces the location sharedData.state.name is the display of the new user ????
    const sharedData = useLocation();
    const navigate = useNavigate()

    return (
        <div id="page">
            <div className="row" id="header"><img src={logo}></img><p id="namePage">Login</p></div>
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
                        <p>Not registered? <a href="/register">Click here</a> to register</p>
                    </div>
                    <div id="liveAlertPlaceholder"></div>
                    <button onClick={() => { isValidLogin(setUserConnected, userName, navigate) }} type="button"
                        className="btn btn-primary" id="liveAlertBtn">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;

