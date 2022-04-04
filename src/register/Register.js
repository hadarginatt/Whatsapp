import './Register.css'





function Register() {

  return (
      <div id="registerForm" className="offset-2">
          <form className="row g-3">
              <div className="col-md-10">
                  <label for="inputEmail4" className="form-label">User Name</label>
                  <input type="email" className="form-control" id="inputUserName" placeholder="Israel Israeli"></input>
              </div>
              <div className="col-md-5">
                  <label for="inputPassword4" className="form-label">Password</label>
                  <input type="password" className="form-control" id="inputPassword"></input>
              </div>
              <div className="col-md-5">
                  <label for="inputPassword5" className="form-label">Verify Password</label>
                  <input type="password" className="form-control" id="inputPassword2"></input>
              </div>
              <div className="col-md-10">
                  <label for="inputAddress" className="form-label">Nickname</label>
                  <input type="text" className="form-control" id="inputNickname" placeholder="Israel Israeli"></input>
              </div>
              <div className="col-xl-5 input-group mb-3">
                  <input type="file" className="form-control" id="inputGroupFile02"></input>
              </div>


              <div className="col form-floating">

                  <p>Already registered? <a href='/'>Click here</a> to Login</p>





              </div>
              <div className="col-12" id="buttenSignIn">
                  <button type="submit" className="btn btn-primary">Sign in</button>
              </div>
          </form>
      </div>
  );
}


export default Register;
