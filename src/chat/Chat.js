import Logo from './logo.jpeg'
import './Chat.css'
import LeftMenu from '../LeftScreen/LeftMenu'
import databaseusers from '../databaseusers'

function Chat() {
    console.log("from chat")
    console.log(databaseusers)
    return (
        <div class="container-fluid" id="screen">
            <div id="chats" class="row">
                {/**side screen */}
                <LeftMenu/>

                {/**main screen */}

                <div class="col-9">
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="row g-2">
                        <div class="card">
                            <img src={Logo} class="card-img-top" alt="..."></img>
                            <p class="card-text">Start chat</p>
                            <p class="card-text">Choose a photo</p>
                            <p class="card-text">Settings</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
  
export default Chat;
  