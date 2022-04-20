import './Register.css'
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../chat/logo.jpeg'

{/**
the function checks that all the parameters of the registration process are valid.
in case that one of the parameters invalid - asks the user to change the relevant value.
in addition - checks if the user is not signed in already.
 */}

function isValid(dataBase) {
    // save the data from the input form.
    var name = document.getElementById("inputUserName").value;
    var pass = document.getElementById("inputPassword").value;
    var verifyPass = document.getElementById("inputPassword2").value;
    var nickname = document.getElementById("inputNickname").value;
    var image = document.getElementById("inputimg").value;


    // save div to alerts about errors and initial the div to be without any message.
    var noUserName = document.getElementById('noUserNameAlert')
    var existingName = document.getElementById('existingNameAlert')
    var lessLetters = document.getElementById('lessLettersAlert')
    var noLetter = document.getElementById('noLetterAlert')
    var noDigit = document.getElementById('noDigitAlert')
    var noMatch = document.getElementById('noMatchAlert')
    var noNickName = document.getElementById('noNickNameAlert')
    var noImg = document.getElementById('emptyImg')
    var invalidImg = document.getElementById('invalidImg')
    var lengthNockName = document.getElementById('lengthAlert')

    noUserName.innerHTML = ""
    existingName.innerHTML = ""
    lessLetters.innerHTML = ""
    noLetter.innerHTML = ""
    noDigit.innerHTML = ""
    noMatch.innerHTML = ""
    noNickName.innerHTML = ""
    noImg.innerHTML = ""
    invalidImg.innerHTML = ""
    lengthNockName.innerHTML = ""

    // the flag will indicate if the parameters in the input are valid.
    var flag = true;

    //check username is not empty.   
    if (name.length === 0) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Please enter user name"
        errorHtml.innerHTML = "<p><small id='noUserName' className='errorMessages'>" + message + "</small></p>"
        noUserName.append(errorHtml)
    }

    //check if the username is already exist.
    if (dataBase.find((value) => { return value.username === name })) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "User name is already exists"
        errorHtml.innerHTML = "<p><small id='existingName' className='errorMessages'>" + message + "</small></p>"
        existingName.append(errorHtml)
    }

    //check nickname is not empty.
    if (nickname.length === 0) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Please enter nickname"
        errorHtml.innerHTML = "<p><small id='noNickName' className='errorMessages'>" + message + "</small></p>"
        noNickName.append(errorHtml)
    }

    //check nickname is less than 10 chars
    if (nickname.length > 10) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Nickname should consist no longer than 10 letters"
        errorHtml.innerHTML = "<p><small id='noNickName' className='errorMessages'>" + message + "</small></p>"
        lengthNockName.append(errorHtml)
    }

    //check if password and verify password is equal.
    if (pass != verifyPass) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Passwords do not match"
        errorHtml.innerHTML = "<p><small id='noMatch' className='errorMessages'>" + message + "</small></p>"
        noMatch.append(errorHtml)
    }
    //check password length is not less than 6.
    if (pass.length < 6) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Password should consist at least 6 letters"
        errorHtml.innerHTML = "<p><small id='lessLetters' className='errorMessages'>" + message + "</small></p>"
        lessLetters.append(errorHtml)
    }

    //check password consists of at list one digit.
    var flagNum = false;
    var number = /^[0-9]+$/;
    for (let i = 0; i < pass.length; i++) {
        if (pass[i].match(number)) {
            flagNum = true
        }
    }
    if (!flagNum) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Password should consist at least one digit"
        errorHtml.innerHTML = "<p><small id='noLetter' className='errorMessages'>" + message + "</small></p>"
        noDigit.append(errorHtml)
    }

    //check password consist of at list one letter. 
    var flagLetter = false;
    var letter = /^[a-zA-Z]+$/;
    for (let i = 0; i < pass.length; i++) {
        if (pass[i].match(letter)) {
            flagLetter = true
        }
    }
    if (!flagLetter) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Password should consist at least one letter"
        errorHtml.innerHTML = "<p><small id='noLetter' className='errorMessages'>" + message + "</small></p>"
        noLetter.append(errorHtml)
    }

    //check if there is an input of image.
    if (image.length === 0) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "Please choose profile picture"
        errorHtml.innerHTML = "<p><small id='noImage' className='errorMessages'>" + message + "</small></p>"
        noImg.append(errorHtml)
    }

    //check if the image is valid.
    let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    let type = document.getElementById('inputimg').files[0].type;

    if (allowedExtension.indexOf(type) == -1) {
        flag = false;
        var errorHtml = document.createElement('div')
        var message = "wrong type of profile image"
        errorHtml.innerHTML = "<p><small id='invalidImage' className='errorMessages'>" + message + "</small></p>"
        invalidImg.append(errorHtml)
    }

    return flag;
}


{/**
returns the component for dispaly and update the database with the new user.
 */}
function Register({ dataBase, setDataBase }) {

    const [file, setFile] = useState();
    //created a path to the location by navigae. 
    const shareDataBaseUsers = useNavigate()

    function handleChange(e) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    function Upload() {
        if (isValid(dataBase)) {
            var name = document.getElementById("inputUserName").value;
            var pass = document.getElementById("inputPassword").value;
            var nickname = document.getElementById("inputNickname").value;
            var img = URL.createObjectURL(document.getElementById('inputimg').files[0])
            //update the new user in the database.
            dataBase.push({ username: name, password: pass, nickName: nickname, img: img, messages: [] })
            setDataBase(dataBase.concat([]))

            //change the  locations state of login (now is null).
            shareDataBaseUsers('/', { state: dataBase });
        }
    }

    return (
        <div>
            <div className="row" id="header"><img src={logo}></img><p id="namePage">Register</p></div>
            <div id="registerForm" className="offset-2">
                <form className="row g-2">
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
                        <input type="text" className="form-control" id="inputNickname" placeholder="Israel Israeli Is The BEST"></input>
                        <div id="noNickNameAlert" className='alerts'></div>
                        <div id="lengthAlert" className='alerts'></div>
                    </div>
                    <div className="App">
                        <label>
                        <label htmlFor="inputAddress" className="form-label">Press To Add Profile Picture</label>
                        <input hidden={true} id="inputimg" type="file" accept="image/*" name="image" />
                        <i id="uploadImage" class="bi bi-image"></i>
                        </label>
                        <div id="emptyImg" className='alerts'></div>
                        <div id="invalidImg" className='alerts'></div>
                    </div>
                    <div className="col form-floating  offset-3">
                        <p>Already registered? <a href='/'>Click here</a> to Login</p>
                    </div>
                    <div className="col-12" id="buttenSignIn">
                    {/*upload and checks the inserted parameters*/}
                        <button onClick={function (e) { Upload() }} type="button" className="btn btn-primary">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
