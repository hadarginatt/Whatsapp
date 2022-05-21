import axios from 'axios';




var localDB = {
    UserDetails : {
        username: '',
        password: '',
        nickname: '',
        server: '',
        img: '',
    },
    chats: [],
    contacts: []
}


export var serverConnected = "localhost:5022";

export function getNickName() {
    return localDB.UserDetails.nickname;
}

export function getNameConnected() {
    return localDB.UserDetails.username;
}

export function getChats() {
    return localDB.chats;
}

export function getContacts() {
    return localDB.contacts;
}

export function getNickNameContact(name) {
    return localDB.contacts.find((value) => value.id === name).name;
}

export function getServerContact(name) {
    return localDB.contacts.find((value) => value.id === name).server;
}


export const updateMessages = async function(nameConnected, setMyMessages) {
    await fetch('http://'+ serverConnected +'/api/contacts/GetUser/?username=' + nameConnected)
        .then(response => response.json())
        .then(data => {
            localDB.UserDetails.username = data.username;
            localDB.UserDetails.password = data.password;
            localDB.UserDetails.server = data.server;
            localDB.UserDetails.nickname = data.nickname;
            localDB.chats = data.chats;
            console.log(data.chats);
            console.log(localDB.chats);
            setMyMessages(localDB.chats.concat([]));
        })
}


// save the contacts of the user that connected
export const updateContacts = async function(nameConnected, setContacts) {
    await fetch('http://'+ serverConnected +'/api/contacts?name=' + nameConnected)
        .then(response => response.json())
        .then(data => {
            localDB.contacts = data;
            console.log(localDB.contacts);
            setContacts(localDB.contacts);
        })
}


export const addUserToDB = async (setDataBase, username, password, nickname, server) => {
    
    // add other server
    var myResponse = await axios.post(
        'http://'+ serverConnected +'/api/contacts/AddUser',
        {username : username, password: password, nickname : nickname, server: server },
        { withCredentials: true},
    )
    
    // const data = myResponse.data
    //const data = await fetchContacts();
    //setDataBase(data);
    //console.log(data);
   
}


export const getDB = async function(setDataBase) {
    const res = await fetch('http://'+ serverConnected +'/api/contacts/GetUsers');
    const data = await res.json();
    setDataBase(data);
    console.log(data);  
    }



    export const addUserToChat = async (nameConnected, setContacts, setMyMessages, username, password, nickname, server, setNickNameUserChat, setUserChat, connection) => {
    
        // add other server
        var myResponse = await axios.post(
            'http://'+ serverConnected +'/api/contacts/' + nameConnected,
            {username:username, password: "", nickname: nickname, server: server},
            { withCredentials: true},
        )
        .then(async (myResponse) => {
            if (myResponse.status == 200) {
                var myResponse2 = await axios.post(
                    'http://' + server + '/api/invitations',
                    {from:nameConnected, to: username, server: serverConnected},
                    { withCredentials: true},
                )
            }
        })
        .then(async (myResponse2) => {
            updateMessages(nameConnected, setMyMessages);
            updateContacts(nameConnected, setContacts);
            setNickNameUserChat(nickname);
            setUserChat(username);
            await connection.send("Changed", username, server);
        })
            
        //const data = myResponse.data
        //const data = await fetchContacts();
        //console.log("nick at: add user", nickname);
        
    }

    export const addNewMessage = async (nameConnected, setMyMessages, username, content, connection, setContacts) => {
        var serverUser = getServerContact(username);
        var myResponse = await axios.post(
            // add to myself
            'http://'+ serverConnected +'/api/contacts/' +  username + '/messages',
            {from:nameConnected, to: username, content: content},
            { withCredentials: true},
        )
        .then(async (myResponse) => {
            if (myResponse.status == 200) {
                var myResponse2 = await axios.post(
                    'http://' + serverUser + '/api/transfer',
                    {from:nameConnected, to: username, content: content},
                    { withCredentials: true},
                )
            }
        })
        .then(async () => {
            updateMessages(nameConnected, setMyMessages);
            updateContacts(nameConnected, setContacts);
            console.log("send change!");
            await connection.send("Changed", username, serverUser);
        })
    }

    export const checkIfUserInDB = async (username, password,Answer, setAnswer) => {
    
        // get the response from the server
        var myLoginResponse = await axios.post(
            'http://'+ serverConnected +'/api/contacts/logInUserCheck',
            {username : username, password: password},
            { withCredentials: true},
        )
        
        .then(async (myLoginResponse) => {
            console.log(myLoginResponse);
            if (myLoginResponse.status == 200) {
                setAnswer(true);
                return true;
                
                
                //return Answer
            }
            else if(myLoginResponse.status == 400){
                setAnswer(false);
                //return Answer;
            }
        }) 

        .catch(async (myLoginResponse) => {
            console.log("error" ,myLoginResponse);
            if (myLoginResponse.response.status == 400) {
                console.log("worllldddd");

                setAnswer(false);
                return false;
                
                
                //return Answer
            }
        })
        return myLoginResponse;
    }   


        // const data = myLoginResponse.data
        // console.log(data.status);
        // return data;
        //const data = await fetchContacts();
        //setDataBase(data);
        //console.log(data);
       
    

