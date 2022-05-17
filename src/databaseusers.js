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


export const updateMessages = async function(nameConnected, setMyMessages) {
    await fetch('http://localhost:5022/api/contacts/GetUser/?username=' + nameConnected)
        .then(response => response.json())
        .then(data => {
            localDB.UserDetails.username = data.username;
            localDB.UserDetails.password = data.password;
            localDB.UserDetails.server = data.server;
            localDB.UserDetails.nickname = data.nickname;
            localDB.chats = data.chats;
            console.log(data.chats);
            console.log(localDB.chats);
            setMyMessages(localDB.chats);
        })
}


// save the contacts of the user that connected
export const updateContacts = async function(nameConnected, setContacts) {
    await fetch('http://localhost:5022/api/contacts?name=' + nameConnected)
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
        'http://localhost:5022/api/contacts/AddUser',
        {username : username, password: password, nickname : nickname, server: server },
        { withCredentials: true},
    )
    
    // const data = myResponse.data
    //const data = await fetchContacts();
    //setDataBase(data);
    //console.log(data);
   
}


export const getDB = async function(setDataBase) {
    const res = await fetch('http://localhost:5022/api/contacts/GetUsers');
    const data = await res.json();
    setDataBase(data);
    console.log(data);  
    }



    export const addUserToChat = async (nameConnected, setContacts, setMyMessages, username, password, nickname, server, setNickNameUserChat, setUserChat) => {
    
        // add other server
        var myResponse = await axios.post(
            'http://localhost:5022/api/contacts/' + nameConnected,
            {username:username, password: "", nickname: nickname, server: server},
            { withCredentials: true},
        )
        .then((myResponse) => {
            if (myResponse.status == 200) {
                updateMessages(nameConnected, setMyMessages);
                updateContacts(nameConnected, setContacts);
                setNickNameUserChat(nickname);
                setUserChat(username);
                return true;
            }
            else {
                return false;
            }})
            
        //const data = myResponse.data
        //const data = await fetchContacts();
        //console.log("nick at: add user", nickname);
        
    }

