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


 var databaseusers =
 [{username : "Hadar", password : "1111", nickName: "Hadari", img: woman1, messages: 
 [{user: "Itay",message: [{type : "text", content: "hye!", time: "12:14", fromto: "from"}, {type : "text", content: "did you see my cat?", time: "12:15", fromto: "from"}, {type : "image", content: cat, time: "12:15", fromto: "from"}]},
 {user: "David",message: [{type : "text", content: "how are you doing?", time: "14:16", fromto: "from"}]},
 {user: "Noa",message: [{type : "audio", content: record1, time: "14:17", fromto: "to"}, {type : "audio", content: record2, time: "14:19", fromto: "from"}]},
 {user: "Noam",message: [{type : "audio", content: record, time: "14:20", fromto: "to"}]},
 {user: "Ofer",message: [{type : "text", content: "happy birthday!", time: "15:00", fromto: "to"}, {type : "video", content: video1, time: "15:01", fromto: "to"}]}]},
  {username : "Noa", password : "2222", nickName: "Noush", img: woman2, messages: [{user: "Itay", message: [{type : "text", content: "nice to hear from you", time: "14:17", fromto: "to"}]}]},
  {username : "Itay", password : "3333", nickName: "ItayTheBest", img: man1, messages: [{user: "Itay", message: [{type : "text", content: "talk to me when you can", time: "14:17", fromto: "to"}]}]},
  {username : "Ofer", password : "4444", nickName: "Oferush", img: man2, messages: [{user: "Itay", message: [{type : "text", content: "hey!", time: "14:17", fromto: "to"}]}]},
  {username : "Dror", password : "4444", nickName: "Drori", img: man3, messages: [{user: "Itay", message: [{type : "text", content: "tried to call you", time: "14:17", fromto: "to"}]}]},
  {username : "David", password : "4444", nickName: "Davidi", img: man4, messages: [{user: "Itay", message: [{type : "text", content: "when do you go to work?", time: "14:17", fromto: "to"}]}]},
  {username : "Noam", password : "5555", nickName: "Noamush", img: man5, messages: [{user: "Itay", message: [{type : "text", content: "byby", time: "14:17", fromto: "to"}]}]}];



  export default databaseusers;