import  man1 from './man1.png'
import  man2 from './man2.jpg'
import  man3 from './man3.png'
import  man4 from './man4.png'
import  man5 from './man5.jpg'
import  woman1 from './woman1.jpg'
import  woman2 from './woman2.jpg'

 var databaseusers =
 [{username : "Hadar", password : "1111", nickName: "Hadari", img: woman1, messages: 
 [{user: "Noa",message: [{type : "text", content: "hello", time: "12:13", fromto: "from"},{type : "text", content: "hello2", time: "12:14", fromto: "to"}, {type : "text", content: "hadarrrr", time: "12:15", fromto: "to"}]},
 {user: "David",message: [{type : "text", content: "hellohhhhhhh", time: "14:16", fromto: "from"}]},
 {user: "Itay",message: [{type : "text", content: "hello", time: "14:17", fromto: "to"}]},
 {user: "Noam",message: [{type : "text", content: "hello", time: "14:18", fromto: "to"}]},
 {user: "Ofer",message: [{type : "text", content: "hello", time: "18:50", fromto: "to"}]}]},
  {username : "Noa", password : "2222", nickName: "Hadari", img: woman2, messages: [{user: "Itay", message: [{type : "text", content: "hello", time: "14:17", fromto: "to"}]}]},
  {username : "Itay", password : "3333", nickName: "Hadari", img: man1, messages: [{user: "Itay", message: [{type : "text", content: "hello", time: "14:17", fromto: "to"}]}]},
  {username : "Ofer", password : "4444", nickName: "Hadari", img: man2, messages: [{user: "Itay", message: [{type : "text", content: "hello", time: "14:17", fromto: "to"}]}]},
  {username : "Dror", password : "4444", nickName: "Hadari", img: man3, messages: [{user: "Itay", message: [{type : "text", content: "hello", time: "14:17", fromto: "to"}]}]},
  {username : "David", password : "4444", nickName: "Hadari", img: man4, messages: [{user: "Itay", message: [{type : "text", content: "hello", time: "14:17", fromto: "to"}]}]},
  {username : "Noam", password : "5555", nickName: "Hadari", img: man5, messages: [{user: "Itay", message: [{type : "text", content: "hello", time: "14:17", fromto: "to"}]}]}];



  export default databaseusers;