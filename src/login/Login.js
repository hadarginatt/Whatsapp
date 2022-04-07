import './Login.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import databaseusers from '../databaseusers';
import { useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'



function isValidLogin(setUserConnected, userName, navigate) {
    var name = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    if (name == "" || name == null || pass == "" || pass == null) {
        console.log("emptyyyyyyyyyyyyy");
        
        var wrapper = document.createElement('div')
        var type = 'warning'
        var message = 'Oops!! Empty fields! Please enter user name and password.'
        wrapper.innerHTML = '<div className="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    } else if (databaseusers.find((value) => { return value.username === name && value.password === pass })) {
        console.log("goooooooooooooood");


        // change state of name connected
        setUserConnected(name);

        // go to chat
        // window.storage.setItem()
        // window.location.replace("/chat");
        // navigate('/chat')
        navigate('/chat', {state: userName})
        // this.props.history.push('/chat');
        // return (<switch to="/chat" />)
        // this.router.push('/chat')
        // window.history.pushState('Hadar', 'Hadar', '/chat');

    } else {
        console.log("baaaaaaaaaaaaaaadd");
        var wrapper = document.createElement('div')
        var type = 'warning'
        var message = 'Oops!! User name or Password invalid.'
        wrapper.innerHTML = '<div className="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    }
}



function Login({setUserConnected, userName}) {
    // the way to acces the location sharedData.state.name is the display of the new user ????
    const sharedData = useLocation();
    const navigate = useNavigate()

    return (
        <div id="inputsLogin" className="container-fluid">
            <div className="row col-4 offset-4 justify-content-md-center">
                <div className="form-floating mb-3">
                    <input type="username" className="form-control" id="userName" placeholder="Isreal Israeli"></input>
                    <label htmlFor="floatingInput">User Name</label>
{/** 
                    <h1>you tried to pass to me  new user = {sharedData.state == null ? "" : sharedData.state[0].username}</h1>
*/}
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="password" placeholder="Password"></input>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <p>Not registered? <a href="/register">Click here</a> to register</p>
                </div>
            </div>

            <div id="liveAlertPlaceholder"></div>
            <button onClick={() => {isValidLogin(setUserConnected, userName, navigate)}} type="button" className="btn btn-primary" id="liveAlertBtn">Login</button>
        </div>
    );
}

export default Login;

