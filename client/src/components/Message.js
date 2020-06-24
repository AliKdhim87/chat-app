import React from 'react';

const Message = ({ message, name }) => {
  return (
    <>
      {message.username === name.toLowerCase() ? (
        <div
          className='chat-content'
          style={{ float: 'left', background: '#adb5bd' }}
        >
          <div className='name'>
            <h6>{message.username}</h6>
            <span>{message.time}</span>
          </div>
          <p>{message.text}</p>
        </div>
      ) : (
        <div
          className='chat-content'
          style={{ float: 'right', background: '#8ec1f8' }}
        >
          <div className='name'>
            <h6>{message.username}</h6>
            <span>{message.time}</span>
          </div>
          <p>{message.text}</p>
        </div>
      )}
    </>
  );
};

export default Message;
