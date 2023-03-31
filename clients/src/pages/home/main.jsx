 import React from 'react'
 import "./main.css"
 import Home from '.'
 function Main({ username, setUsername, room, setRoom, socket }) {
   return (
    <>


<div className="area" >
        <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
        </ul>
</div >
    <div className="context">
    < Home 
    
    
    username={username}
    setUsername={setUsername}
    room={room}
    setRoom={setRoom}
    socket={socket}

    />
</div>
    </>
   )
 }
 
 export default Main