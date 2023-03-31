import styles from './styles.module.css'
import React , {useState} from 'react'


const SendMessage = ({socket , username , room}) => {

const [message , setMessage] = useState('');

const send_message = () =>{

    if(message !== ''){

        const _createdtime_ = Date.now();

        socket.emit('Send_message' , { username , room , message , _createdtime_});
        setMessage('');

    }
    
};




  return (
    <div className={styles.sendMessageContainer}>
    <input
      className={styles.messageInput}
      placeholder='Message...'
      onChange={(e) => setMessage(e.target.value)}
      value={message}
    />
    <button className='btn btn-primary' onClick={send_message}>
      Send Message
    </button>
  </div>
);
}

export default SendMessage