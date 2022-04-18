import './Register.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



function isValid(dataBase){
    // save the data from the inputs
    var name = document.getElementById("inputUserName").value;
    var pass = document.getElementById("inputPassword").value;
    var verifyPass = document.getElementById("inputPassword2").value;
    var nickname = document.getElementById("inputNickname").value;
    var image = document.getElementById("inputimg").value;


    // save div to alerts of errors and initial to be without any message
    var noUserName = document.getElementById('noUserNameAlert')
    var existingName = document.getElementById('existingNameAlert')
    var lessLetters = document.getElementById('lessLettersAlert')
    var noLetter = document.getElementById('noLetterAlert')
    var noDigit = document.getElementById('noDigitAlert')
    var noMatch = document.getElementById('noMatchAlert')
    var noNickName = document.getElementById('noNickNameAlert')

    noUserName.innerHTML = ""
    existingName.innerHTML = ""
    lessLetters.innerHTML = ""
    noLetter.innerHTML = ""
    noDigit.innerHTML = ""
    noMatch.innerHTML = ""
    noNickName.innerHTML = ""
    
   
    var flag = true;

    //check username is not empty   
    if(name.length === 0){
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Please enter user name"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        noUserName.append(errorHtml)
    }

    //check if the username is already exist
    if (dataBase.find((value) => { return value.username === name })){
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "User name is already exists"
        errorHtml.innerHTML = "<p><small id='existingName' className='errorMessages'>"  + message + "</small></p>"
        existingName.append(errorHtml)
    }

    //check nickname is not empty 
    if(nickname.length === 0){
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Please enter nickname"
        errorHtml.innerHTML = "<p><small id='noNickName' className='errorMessages'>" + message + "</small></p>"
        noNickName.append(errorHtml)
    }

    //check if password and verify password is equal
    if (pass != verifyPass) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Passwords do not match"
        errorHtml.innerHTML = "<p><small id='noMatch' className='errorMessages'>" + message + "</small></p>"
        noMatch.append(errorHtml)
    }
    //check password length is not less than 6
    if (pass.length < 6){
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Password should consist at least 6 letters"
        errorHtml.innerHTML = "<p><small id='lessLetters' className='errorMessages'>" + message + "</small></p>"
        lessLetters.append(errorHtml)
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
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Password should consist at least one digit"
        errorHtml.innerHTML = "<p><small id='noLetter' className='errorMessages'>" + message +"</small></p>"
        noDigit.append(errorHtml)
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
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Password should consist at least one letter"
        errorHtml.innerHTML = "<p><small id='noLetter' className='errorMessages'>" + message +"</small></p>"
        noLetter.append(errorHtml)
        } 
        //check if the image is valid
    
    let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png','image/gif','image/bmp'];
    let type = document.getElementById('inputimg').files[0].type;
    console.log(image);

    if(allowedExtension.indexOf(type)==-1){       
         alert('Not a image');
         flag = false;
         }
    


    return flag;
}



function Register({dataBase, setDataBase}) {
    
    const [file, setFile] = useState();
    //created a path to the location by navigae 
    const shareDataBaseUsers = useNavigate()

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    function Upload(){
        console.log("in upload")
        if (isValid(dataBase)){
            var name = document.getElementById("inputUserName").value;
            var pass = document.getElementById("inputPassword").value;
            var nickname = document.getElementById("inputNickname").value;
            var img = document.getElementById("inputimg").value;
    
            //itay:
            // new user
            // let user = {
            //     name: name,
            //     nickname: nickname,
            //     pass: pass,
            //     imgSrc: img
            // }
            // console.log(user)
            // //change the  locations state of login (now iys null)
            // shareNewUser('/', {state: user})
    // now we have a new user dictionary as state instead of null
            //save photo

            
             // shareDataBaseUsers('/', {state: user})

             //add the user to database
            console.log(dataBase)
            dataBase.push({username: name, password: pass, nickName: nickname, img: img, messages: []})
            setDataBase(dataBase.concat([]))
            console.log(dataBase)

             
             //change the  locations state of login (now iys null)
            shareDataBaseUsers('/', {state: dataBase})
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
                      <div className="errorMessages"></div>
                      <div id="noUserNameAlert" className='alerts'></div>
                      <div id="existingNameAlert" className='alerts'></div>
                  </div>
              </div>
              <div className="col-md-5">
                  <label htmlFor="inputPassword4" className="form-label">Password</label>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Put at least 6 chars, at least 1 digit, at least 1 letter"></input>
                  <div id="lessLettersAlert" className='alerts'></div>
                  <div id="noLetterAlert" className='alerts'></div>
                  <div id="noDigitAlert" className='alerts'></div>
              </div>
              <div className="col-md-5">
                  <label htmlFor="inputPassword5" className="form-label">Verify Password</label>
                  <input type="password" className="form-control" id="inputPassword2" placeholder="Enter the same password.."></input>
                  <div id="noMatchAlert" className='alerts'></div>
              </div>
              <div className="col-md-10">
                  <label htmlFor="inputAddress" className="form-label">Nickname</label>
                  <input type="text" className="form-control" id="inputNickname" placeholder="Israel Israeli"></input>
                  <div id="noNickNameAlert" className='alerts'></div>
              </div>
              <div className="App">
                  <label htmlFor="inputAddress" className="form-label">Profile Picture</label>
                  <br></br>
                  <input id="inputimg" type="file" accept="image/*" name="image" />
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


// <div className="App">
// <label htmlFor="inputAddress" className="form-label">Profile Picture</label>
// <br></br>
// <input id="inputimg" type="file" />
// <img src={file} />
// </div>
