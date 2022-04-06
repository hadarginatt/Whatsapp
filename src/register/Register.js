import './Register.css'
import databaseusers from '../databaseusers';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function isValid(){
    // check if pass and confirmation is equal
    //not empty
    //only strings
    var name = document.getElementById("inputUserName").value;
    var pass = document.getElementById("inputPassword").value;
    var verifyPass = document.getElementById("inputPassword2").value;
    var nickname = document.getElementById("inputNickname").value;
    
   
    var flag = true;
    var error = "";

    


    //check username is not empty   
    if(name.length === 0){
        error += " " + "username is empty"; 
        flag = false;
        console.log("username is empty")  
        document.getElementById("noUserName").style.visibility =  "visible";

    }
    //check if the username is already exist
    if (databaseusers.find((value) => { return value.username === name })){
        error += " " + "username is already exist"; 
        flag = false;
        console.log("username is already exist")  
    }
    //check nickname is not empty 
    if(nickname.length === 0){
        error += " " + "nickname is empty"; 
        flag = false;
        console.log("username is empty")   
    }
    if (pass != verifyPass) {
        error += " " + "Verification password do not match"; 
        flag = false;
        console.log("Verification password do not match")
    }
     //check password length is  
    if (pass.length < 6){
        error += " " + "Password should have at least 6 letters"; 
        flag = false;
        console.log("Password should have at least 6 letters")
    }

    //check password consist of at list one digit
    var flagNum = false;
    var number = /^[0-9]+$/;
    for (let i = 0; i < pass.length; i++){
        if(pass[i].match(number)) {
            flagNum = true
        }
    }
    if(!flagNum){
        error += "Password should consist of at least one number";
        flag = false;
        console.log("Password should consist of at least one number");
    }

    //check password consist of at list one letter  
    var flagLetter = false;
    var letter = /^[a-zA-Z]+$/;
             
    for (let i = 0; i < pass.length; i++) {
        if (pass[i].match(letter)) {
            flagLetter = true
        }
    }
    if(!flagLetter){
        error += "Password should have at least one letter"; 
        flag = false;
        console.log("Password should have at least one letter");
        } 

    
    // console.log(error);
    return flag;
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
        console.log("in upload")
        if (isValid()){
            var name = document.getElementById("inputUserName").value;
            var pass = document.getElementById("inputPassword").value;
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
                      <label htmlFor="inputEmail4" className="form-label">User Name</label>
                      <input type="text" className="form-control" id="inputUserName" placeholder="Israel Israeli"></input>
                      <p><small id="noUserName" className="errorMessages">Please enter user name</small></p>
                      <p><small id="existingName" className="errorMessages">User name already exists</small></p>
                  </div>
              </div>
              <div className="col-md-5">
                  <label htmlFor="inputPassword4" className="form-label">Password</label>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Put hard password!"></input>
                  <p><small id="lessLetters" className="errorMessages">Password should consist at least 6 letters</small></p>
                  <p><small id="noLetter" className="errorMessages">Password should consist at least one letter</small></p>
                  <p><small id="noDigit" className="errorMessages">Password should consist at least one digit</small></p>
              </div>
              <div className="col-md-5">
                  <label htmlFor="inputPassword5" className="form-label">Verify Password</label>
                  <input type="password" className="form-control" id="inputPassword2" placeholder="Enter the same password.."></input>
                  <p><small id="noMatch" className="errorMessages">Passwords do not match</small></p>
              </div>
              <div className="col-md-10">
                  <label htmlFor="inputAddress" className="form-label">Nickname</label>
                  <input type="text" className="form-control" id="inputNickname" placeholder="Israel Israeli"></input>
                  <p><small id="noNickName" className="errorMessages">Please enter nickname</small></p>
              </div>

              <div className="App">
                  <label htmlFor="inputAddress" className="form-label">Profile Picture</label>
                  <br></br>
                  <input id="inputimg" type="file" />
                  <img src={file} />
              </div>


              <div className="col form-floating">
                  <p>Already registered? <a href='/'>Click here</a> to Login</p>
              </div>
              <div className="col-12" id="buttenSignIn">
                  <button onClick={function (e) { Upload() }} type="button" className="btn btn-primary">Sign in</button>
              </div>
          </form>
      </div>
  );
}


export default Register;
