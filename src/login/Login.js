import './Login.css'
import userNameAndPasswords from '../usersAndPass';

function isValidLogin() {
    var name = document.getElementById("userName").value;
    var pass = document.getElementById("password").value;
    // if (name === '')
    var check = { userName: name, password: pass };
    if (userNameAndPasswords.find((value) => { return value.username === name && value.password === pass })) {
        valid();
    } else {
        invalid();
    }


}

function valid() {
    console.log("goooooooooooooood");
}

function invalid() {
    
    console.log("baaaaaaaaaaaaaaadd");
    var alertMessege = document.getElementById("alert");
    alertMessege.style.visibility = "visible";
}
// function Empty(){

// }

function Login() {
    return (
        <div id="inputsLogin" className="container-fluid">
            <div className="row col-4 offset-4 justify-content-md-center">
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
            </div>
            <button onClick={isValidLogin} type="button" className="row offset-4 btn btn-primary btn-md">Login</button>
            <div id="alert" style={{visibility: "hidden"}} className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Oops!!</strong>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        

    );
}

export default Login;
