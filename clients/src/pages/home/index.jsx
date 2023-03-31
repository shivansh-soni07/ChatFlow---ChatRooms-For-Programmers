import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();

  // we will listen this join_room event on our server
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }

    navigate("/chat", { replace: true });
  };

  return (
    <>
      <div id="container">
  <form action="">
  <img src="https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg" /><br />
  <h1>ChatFlow</h1>
  <input
          className={styles.input}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          /><br />
    {/* ////////////////// */}
    <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
          >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>
{/* ////////////// */}
<button type="button"
          className="button-89"
          onClick={joinRoom}
          style={{ width: "100%" }}
          >
          Join Room
          </button>
  </form>
 
    </div>
          </>
  );
};

export default Home;
