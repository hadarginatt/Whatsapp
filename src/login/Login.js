import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import databaseusers from '../databaseusers';


{/**
the function checks that all user parameters inserted correctly in the Login form.
 */}
function isValidLogin(setUserConnected, userName, navigate) {
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

        //in case all login parameters are valid. 
    } else if (databaseusers.find((value) => { return value.username === name && value.password === pass })) {
        // change the state of the name to connected.
        setUserConnected(name);
        // go to the chat page.
        navigate('/chat', { state: userName })

        //in case that username or password are invalid.
    } else {
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
function Login({ setUserConnected, userName, dataBase }) {
    // the way to acces the location sharedData.
    const sharedData = useLocation();
    const navigate = useNavigate()

    return (
        <div id="page">
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
                    <button onClick={() => { isValidLogin(setUserConnected, userName, navigate) }} type="button"
                        className="btn btn-primary" id="liveAlertBtn">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;

