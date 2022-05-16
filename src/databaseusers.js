import  man1 from './man1.png'
import  man2 from './man2.jpg'
import  man3 from './man3.png'
import  man4 from './man4.png'
import  man5 from './man5.jpg'
import  woman1 from './woman1.jpg'
import  woman2 from './woman2.jpg'
import cat from './cat.jpg'
import record from './record.ogg'
import record1 from './recordHadarToNoa.ogg'
import record2 from './recordNoaToHadar.ogg'
import video1 from './video1.mp4'


{/**hardcoded database for the users in the chat for the starting position. */}


//  var databaseusers =
//  [{username : "Hadar", password : "123456a", nickName: "Hadari", img: woman1, messages: 
//  [{user: "Itay",message: [{type : "text", content: "hye!", time: "15:00", date: "25/04/2022", fromto: "from"}, {type : "text", content: "did you see my cat?", time: "15:01", date: "25/04/2022", fromto: "from"}, {type : "image", content: cat, time: "15:01", date: "25/04/2022", fromto: "from"}]},
//  {user: "David",message: [{type : "text", content: "how are you doing?", time: "14:16", date: "25/04/2022",  fromto: "from"}]},
//  {user: "Noa",message: [{type : "audio", content: record1, time: "12:17", date: "25/04/2022",  fromto: "to"}, {type : "audio", content: record2, time: "12:19", date: "25/04/2022", fromto: "from"}]},
//  {user: "Noam",message: [{type : "audio", content: record, time: "10:20", date: "25/04/2022",  fromto: "to"}]},
//  {user: "Ofer",message: [{type : "text", content: "happy birthday!", time: "09:42", date: "25/04/2022",  fromto: "to"}, {type : "video", content: video1, time: "09:50", date: "25/04/2022", fromto: "to"}]}]},
//   {username : "Noa", password : "noa1234", nickName: "Noal'e", img: woman2, messages: [{user: "Itay", message: [{type : "text", content: "nice to hear from you", time: "14:17", date: "25/04/2022", fromto: "to"}]}]},
//   {username : "Itay", password : "itay4567", nickName: "Itay30", img: man1, messages: [{user: "Noa", message: [{type : "text", content: "talk to me when you can", time: "14:17", date: "25/04/2022", fromto: "to"}]}]},
//   {username : "Ofer", password : "ofer8890", nickName: "Oferush", img: man2, messages: [{user: "Noa", message: [{type : "text", content: "hey!", time: "14:17", date: "25/04/2022", fromto: "to"}]}]},
//   {username : "Dror", password : "2022dror", nickName: "Drori", img: man3, messages: [{user: "Itay", message: [{type : "text", content: "tried to call you", time: "14:17", date: "25/04/2022", fromto: "to"}]}]},
//   {username : "David", password : "davidking1", nickName: "Davidi", img: man4, messages: [{user: "Noam", message: [{type : "text", content: "when do you go to work?", time: "14:17", date: "25/04/2022", fromto: "to"}]}]},
//   {username : "Noam", password : "noamthebest10", nickName: "Noamush", img: man5, messages: [{user: "Itay", message: [{type : "text", content: "byby", time: "14:17", date: "25/04/2022", fromto: "to"}]}]}];



//   export default databaseusers;

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

export function getChats() {
    return localDB.chats;
}

export function getContacts() {
    console.log("return:" ,localDB.contacts);
    return localDB.contacts;
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


