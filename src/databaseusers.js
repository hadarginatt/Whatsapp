import  man1 from './man1.png'
import  man2 from './man2new.jpg'
import  man3 from './man3.png'
import  man4 from './man4.png'
import  man5 from './man5.jpg'
import  woman1 from './woman1.jpg'
import  woman2 from './woman2.jpg'


{/**hardcoded database for the users in the chat for the starting position. */}


 var databaseusers =
 [{username : "Hadar", password : "1111", nickName: "Hadari", img: woman1, messages: 
 [{user: "Noa",message: [{type : "text", content: "hello", time: "12:13", fromto: "from"},{type : "text", content: "hello", time: "12:14", fromto: "to"}, {type : "text", content: "did you see the news?", time: "12:15", fromto: "to"}]},
 {user: "David",message: [{type : "text", content: "how are you doing?", time: "14:16", fromto: "from"}]},
 {user: "Itay",message: [{type : "text", content: "how was your flight to rome?", time: "14:17", fromto: "to"}]},
 {user: "Noam",message: [{type : "text", content: "call me when you can", time: "14:18", fromto: "to"}]},
 {user: "Ofer",message: [{type : "text", content: "happy birthday!", time: "18:50", fromto: "to"}]}]},
  {username : "Noa", password : "2222", nickName: "Noush", img: woman2, messages: [{user: "Itay", message: [{type : "text", content: "nice to hear from you", time: "14:17", fromto: "to"}]}]},
  {username : "Itay", password : "3333", nickName: "ItayTheBest", img: man1, messages: [{user: "Itay", message: [{type : "text", content: "talk to me when you can", time: "14:17", fromto: "to"}]}]},
  {username : "Ofer", password : "4444", nickName: "Oferush", img: man2, messages: [{user: "Itay", message: [{type : "text", content: "hey!", time: "14:17", fromto: "to"}]}]},
  {username : "Dror", password : "4444", nickName: "Drori", img: man3, messages: [{user: "Itay", message: [{type : "text", content: "tried to call you", time: "14:17", fromto: "to"}]}]},
  {username : "David", password : "4444", nickName: "Davidi", img: man4, messages: [{user: "Itay", message: [{type : "text", content: "when do you go to work?", time: "14:17", fromto: "to"}]}]},
  {username : "Noam", password : "5555", nickName: "Noamush", img: man5, messages: [{user: "Itay", message: [{type : "text", content: "byby", time: "14:17", fromto: "to"}]}]}];



  export default databaseusers;