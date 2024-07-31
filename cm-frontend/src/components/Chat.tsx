// src/components/Chat.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat: React.FC<{ gameId: string }> = ({ gameId }) => {
  // types for messages
  type Message = {
    user: string;
    message: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chat/${gameId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [gameId]);

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:5000/api/chat`, {
        gameId,
        user: 'userId', // Replace with actual user ID
        message
      });
      setMessages([...messages, { user: 'userId', message }]); // Replace with actual user ID
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
