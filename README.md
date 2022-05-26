# whatsappServer

 # Students:
   Noa Eitan , Id: 316222777
   Hadar Ginatt , Id: 207542663
    
   # Relevant Packages:
   
   react@12.1.4
   
   bootstrap@5.1.3
   
   jquery@3.6.0
   
   react-bootstrap@2.2.3
   
   react-dom@18.0.0
   
   react-router-dom@6.3.0
   
   @microsoft/signalr": "^6.0.5"
   
   axios": "^0.27.2"

        
        
   # General Instructions:
   
   Welcome to our Whatsapp server!
   Before you start, please read the following instructions:
   
   The current IP in the project and in the Rates is a localhost, In case you would prefer to work with a different IP please follow the next steps: 
   
      In the react project in databaseusers.js file - change the variable "serverConnected" to be with your computer IP.
   
      In the project webAPI - in contactsService.cs file -  change the variable "serverIP" to be with your computer IP.
      
      If the server of the MVC is not placed in the same location of the React - please change here to the relevant IP:
      <img width="952" alt="MVCURL" src="https://user-images.githubusercontent.com/84575056/170447332-441ae856-0234-49f5-9f14-81b56720dc91.PNG">

      
      In the React - there is a variable in the file databaseusers.js named rateURL (line 21) - change it as well like in the instruction above:
     <img width="319" alt="rateURL" src="https://user-images.githubusercontent.com/84575056/170450831-53b675df-d058-4083-ad3b-145465d34e47.PNG">

      In the launch settings change the localhost to be with 0.0.0.0 like here:
      <img width="933" alt="changeURL (1)" src="https://user-images.githubusercontent.com/84575056/170452071-b27d85e4-ebd3-42c9-9260-b5c8d670b2fb.PNG">
      
      (If you change to 0.0.0.0 notice the swagger is not supported).


   # Database instructions:
      
   In the API we used a static database and in the MVC Rate we used mySQL database - notice to perform the CMD update database in the console if needed.
      
   # Running instructions:
   
    - press Run on the ProjectWhatssap
     
    - press Run on the WebApi
    
    1. In the project directory - please run the commands
       
    - **npm install**
    
    - **npm i anxios**
    
    - **npm i  --save @microsoft/signalr**
    
    -  and then finally run **npm start**.
   
   2. In the Home page (Login page) - Enter the name **noa** and the Password **123456a** and connect to the Chat page.
   ![image](https://user-images.githubusercontent.com/84575056/170075227-046a9893-4928-4ffd-a385-aa6717d2f81d.png)

    if you would like to check a different user -  see the details in  ProjectWhatssap -> Services -> contactsService.cs.
      
   3. If not registered yet - click the link below (Click here) and follow the input inserting instructions for validity and security checks.
   ![image](https://user-images.githubusercontent.com/84575056/170075825-d151c600-b070-4525-94c8-44c9e42febba.png)
   and fill in your detailes
   ![image](https://user-images.githubusercontent.com/84575056/170077258-17d1a212-5ce4-47dc-b2de-0df2aeecb7c1.png)


   5. In the Chat page - You can start to chat with your friends from the current server or from a different one as follows:
  ![image](https://user-images.githubusercontent.com/84575056/170076344-db579554-d4fa-400c-975d-b6100b1423fa.png)

   
   6. In case of a new chat addition - you can add the user name according to the  contactsService.cs as well.
  ![image](https://user-images.githubusercontent.com/84575056/170076980-06943ae5-b8b5-44d1-a990-e3d4edf21d0d.png)
  
  7. We will appreciate your rate for our web, you can get there from the link above
  
  ![image](https://user-images.githubusercontent.com/84575056/170077689-4dc1cc07-48b6-4386-ad4a-0cf19331e93f.png)
  
  <img width="958" alt="rate" src="https://user-images.githubusercontent.com/84575056/170108225-9e7d21d7-ba0d-45a1-8f02-45dcf0710211.PNG">
  
  *We did not use JWT or Session due the fact we are a couple - the URL must consist the name connected - you can see the following in the Swagger.

  
   Enjoy your chats :)
   
   
       
  
