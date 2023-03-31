import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import io from 'socket.io-client'
import Chat from "./pages/chat";
import Main from "./pages/home/main";



// socket emit will be on this server
const socket = io.connect('http://localhost:4000/');


function App() {

const [username , setUsername] = useState('');
const [room , setRoom] = useState('');






  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main

username={username}
setUsername={setUsername}
room={room}
setRoom={setRoom}
socket={socket}
              
            />} />


              <Route path="/chat" element={< Chat username={username}  room={room} socket={socket} />} />



          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
