import styles from './styles.module.css';
import MessagesReceived from './messages';
import SendMessage from './send-messages';
import RoomAndUsers from './room-and-users';
import "./index.css"
const Chat = ({ socket  , username , room}) => {
  return (
  
    <div className="Chats">

    
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
 
 
    </div>
    
    
   
  );
};

export default Chat;