import React from "react";
import styles from "./styles.module.css";
import { useState, useEffect ,useRef} from "react";

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);

      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          _createdtime_: data._createdtime_,
        },
      ]);
    });

    return () => socket.off("receive_message");
  }, [socket]);
 
   // Add this
   function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }
  // Add this
  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('last_100_messages', (last100Messages) => {
      // console.log('Last 100 messages:', JSON.parse(last100Messages));
      let last_100 = last100Messages.toJSON();
      // Sort these messages by __createdtime__
      last_100 = sortMessagesByDate(last_100);
      setMessagesReceived((state) => [...last_100, ...state]);
    });

    return () => socket.off('last_100_messages');
  }, [socket]);


    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
      }
    

  return (
    <div className={styles.messagesColumn}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg._createdtime_)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
