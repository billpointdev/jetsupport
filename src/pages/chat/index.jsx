import { useState, useEffect, useRef } from "react";
import {
  // useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
  ChannelSearch,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";

import {  SearchIndex } from "emoji-mart";
// import data from "@emoji-mart/data";
import { AnimatePresence, motion } from "framer-motion";

import "stream-chat-react/dist/css/v2/index.css";
import Navbar from "../../global/navbar";
import { CustomChannelPreview } from "../../components/chat/custom-channel-preview";
import useProviderContext from "../../components/profile-screens/hooks/useProvideContext";
import { USER1, USER2, USER3, framerSidebarPanel } from "../../utils";
import { CustomSearch } from "../../components/chat/custom-search-bar";
import { CustomChannelList } from "../../components/chat/search/custom-channel-list";
import { StreamChat } from "stream-chat";

const apiKey = "65p4bnpn4rhd";
// const userId = "hidden-shadow-2";
// const userName = "hidden-shadow-2";
// const userToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaGlkZGVuLXNoYWRvdy0yIn0.DauCebZ4c75mHfe_Cwe3FMKfVmTBJQrIbhOzpsfQOs4";

// const user = {
//   id: userId,
//   name: userName,
//   image: `https://getstream.io/random_png/?name=${userName}`,
// };

const getRandomUser = () => {
  const users = [USER1, USER2, USER3];
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
};

const JetChat = () => {
  // eslint-disable-next-line no-unused-vars
  const [channel, setChannel] = useState();
  const [chatClient, setChatClient] = useState();
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { setOpen: setDropdown } = useProviderContext();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const client = useCreateChatClient({
  //   apiKey,
  //   tokenOrProvider: userToken,
  //   userData: user,
  // });
  const ref = useRef(null);

  useEffect(() => {
    // if (!client) return;

    async function initChat() {
      const client = StreamChat.getInstance(apiKey);
      const user = getRandomUser();
      client.connectUser(user, client.devToken(user.id));

      const channel = client.channel("team", "general", {
        image: "https://getstream.io/random_png/?name=react",
        name: "Slack Channel",
        // members: [user.id],
      });

      await channel.create();
      channel.addMembers([user.id]);
      setChannel(channel);

      setChatClient(client);
    }

    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ]);

  if (!chatClient) return <div>Setting up client & connection...</div>;

  const toggleSidebar = () => {
    setDropdown(false);
    setOpen((prev) => !prev);
  };

  return (
    <Chat client={chatClient}>
      <Navbar open={open} setOpen={setOpen} toggleSidebar={toggleSidebar} />
      <div className="pt-[66px] flex w-full h-screen border border-purple-600 fixed top-0 left-0 ">
        {windowWidth >= 768 ? (
          <motion.div
            {...framerSidebarPanel}
            className={`flex flex-col w-full  overflow-y-auto   max-w-xs border-r border-lightGray dark:bg-gray-800 bg-white`}
            ref={ref}
            aria-label="Sidebar"
          >
            <ChannelSearch SearchBar={() => <CustomSearch />} />
            <ChannelList
              List={CustomChannelList}
              sendChannelsToList
              Preview={CustomChannelPreview}
              showChannelSearch={false}
              additionalChannelSearchProps={{ searchForChannels: true }}
            />
          </motion.div>
        ) : (
          <AnimatePresence>
            {open && (
              <motion.div
                key="sidebar"
                {...framerSidebarPanel}
                className={`fixed left-0 top-0 flex z-10 flex-col w-full justify-between overflow-y-auto h-screen pt-[66px] max-w-xs border-r border-lightGray dark:bg-gray-800 bg-white`}
                ref={ref}
                aria-label="Sidebar"
              >
                <ChannelSearch SearchBar={() => <CustomSearch />} />
                <ChannelList
                  List={CustomChannelList}
                  sendChannelsToList
                  Preview={CustomChannelPreview}
                  showChannelSearch={false}
                  additionalChannelSearchProps={{ searchForChannels: true }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div className="flex-1">
          <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
    </Chat>
  );
};

export default JetChat;
