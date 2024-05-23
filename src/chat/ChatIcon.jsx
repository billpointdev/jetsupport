import React from 'react';

const ChatIcon = ({ onClick }) => {
  return (
    <button onClick={onClick} style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        background: '#e1771b', 
        color: 'white', 
        borderRadius: '50%', 
        width: '50px', 
        height: '50px', 
        border: 'none', 
        cursor: 'pointer',
        fontSize: 'larger' 
    }}>
      💬
    </button>
  );
};

export default ChatIcon;
