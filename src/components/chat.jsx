import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import '../styles/chat.css'
import  {useSelector} from 'react-redux';
import {createSocketConnection} from '../utils/socket.js';

const chat = () => {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const {userDetails} = useSelector((state) => state.user);

    const sendMessage = () => {
      if(newMessage.trim() === '') return;
      const socket = createSocketConnection();
      socket.emit('sendMessage', {firstName: userDetails.firstName, userId: userDetails._id, targetId: targetUserId, message: newMessage});
      console.log('Sent message:', {firstName: userDetails.firstName,message: newMessage});
      setMessages(messages => [...messages, `You: ${newMessage}`]);
      setNewMessage('');
    }
    useEffect(() => {
      console.log('Setting up chat socket connection...', userDetails, targetUserId);
      if(!targetUserId || !userDetails) return;
      const socket = createSocketConnection();
      socket.emit('joinChat', {userId: userDetails._id, targetId: targetUserId});
      socket.on('receiveMessage', ({firstName, message}) => {
        
        console.log('Received message:', {firstName, message});
        setMessages((prevMessages) => [...prevMessages, `${firstName}: ${message}`]);
      });

      return () => {
        socket.disconnect();
      }
    }, [targetUserId, userDetails]);
  return (
    <div className='chat-container'>
      <h2 className='chat-title'>Chat with User {targetUserId}</h2>
      <div className='chat-messages'>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <div className='chat-input'>
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type your message..." className='chat-input-field' />
        <button className='chat-send-button' onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default chat