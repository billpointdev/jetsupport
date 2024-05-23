import React, { useState, useEffect, useRef } from "react";

import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
  // ChannelList,

} from "stream-chat-react";

import 'stream-chat-react/dist/css/index.css'
import './ChatComponent.css'
// const apiKey = process.env.REACT_APP_STREAM_API_KEY

const apiKey = import.meta.env.VITE_APP_STREAM_API_KEY


const user = {
  id: 'john',
  name: 'John',
  image: 'https://getstream.imgix.net/images/ramdom_svg/FS.png'
}


export default function App({ isVisible, onClose }) {
  const [client, setClient] = useState(null)
  const [channel, setChannel] = useState(null)
  const messageListRef = useRef(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);

      await chatClient.connectUser(user, chatClient.devToken(user.id))

      const channel = chatClient.channel('messaging', 'react-talk', {
        image: 'https://www.drupal.org/files/project-images/react.png',
        name: 'Talk about React',
        members: [user.id]
      })

      await channel.watch()

      setChannel(channel)
      setClient(chatClient)
    }

    init()

    if (client) return () => client.disconnectUser()
  }, []);

  useEffect(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTo({
          top: messageListRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, [channel]);

  if (!channel || !client) return <LoadingIndicator />

  if (!isVisible) return null;

  return (
  <div className="fixed bottom-20 right-5 w-[400px] h-1/2 bg-white border border-gray-300 rounded-lg shadow-md flex flex-col">
      <Chat client={client} theme='messaging light'>
        {/* <ChannelList /> */}
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList reverse={true} className="custom-scrollbar" />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>

      <button onClick={onClose} style={{ 
          position: 'absolute', 
          top: '-40px', 
          right: '10px', 
          background: '#e1771b', 
          color: 'white', 
          border: 'none', 
          borderRadius: '50%', 
          width: '25px', 
          height: '25px', 
          cursor: 'pointer', 
          zIndex: '10'
      }}>X</button>
    </div>
  )

}