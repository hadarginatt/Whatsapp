import Logo from './logo.jpeg'
import './Chat.css'

function Chat() {
    return (
        <div class="container-fluid" id="screen">
            <div class="row">
                <div class="col-3 bg-light vh-100">
                    <ul class="list-group">
                        <li class="d-flex justify-content-between align-items-center">
                            <i class="bi bi-search"></i>
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                            </form>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <span>Add a new chat</span>
                            <i class="bi bi-person-plus"></i>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <i class="bi bi-messenger"></i>
                            <span>Noa Eitan</span>
                            <span class="badge bg-primary rounded-pill">14</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <i class="bi bi-messenger"></i>
                            <span>Hadar Ginatt</span>
                            <span class="badge bg-primary rounded-pill">2</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <i class="bi bi-messenger"></i>
                            <span>Eden</span>
                            <span class="badge bg-primary rounded-pill">1</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <i class="bi bi-messenger"></i>
                            <span> Gal</span>
                            <span class="badge bg-primary rounded-pill">1</span>
                        </li>
                    </ul>
                </div>

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
  