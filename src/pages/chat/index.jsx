import { useState, useEffect, useRef } from "react";
import {
  // useCreateChatClient,
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
  ChannelSearch,
  Streami18n,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";

import { SearchIndex } from "emoji-mart";
// import data from "@emoji-mart/data";
import { AnimatePresence, motion } from "framer-motion";

import "stream-chat-react/dist/css/v2/index.css";
import Navbar from "../../global/navbar";
import { CustomChannelPreview } from "../../components/chat/custom-channel-preview";
import useProviderContext from "../../components/profile-screens/hooks/useProvideContext";
import { USER1, USER2, USER3, framerSidebarPanel, items } from "../../utils";
import { CustomSearch } from "../../components/chat/custom-search-bar";
import { CustomChannelList } from "../../components/chat/search/custom-channel-list";
import { StreamChat } from "stream-chat";
import { CustomChannelHeader } from "../../components/chat/channel-header";
import ChatBody from "../../components/chat/chat-body";
import { useLocation } from "react-router-dom";
import { CustomDateSeparator } from "../../components/chat/date-separator";

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
  const [navCheck, setNavCheck] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);
  
  const { setOpen: setDropdown } = useProviderContext();
  
  const location = useLocation();
  useEffect(() => {
    if (modal) {
      const modalIndex = items.findIndex((item) => item.title === modal);
      if (modalIndex !== -1) {
        setActiveIndex(modalIndex);
      }
    } else {
      const pathIndex = items.findIndex(
        (item) => item.href === location.pathname
      );
      if (pathIndex !== -1) {
        setActiveIndex(pathIndex);
      }
    }
  }, [location, modal]);

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
    const navbar = document.querySelector("#navbar");

    const checkClass = () => {
      if (navbar) {
        if (navbar.classList.contains("open")) {
          setNavCheck(true);
        } else {
          setNavCheck(false);
        }
      }
    };

    checkClass(); // Initial check

    const observer = new MutationObserver(checkClass);
    if (navbar) {
      observer.observe(navbar, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const chatDisplay = document.querySelector("#channel");
    if (chatDisplay) {
      if (window.innerWidth <= 768) {
        chatDisplay.classList.add("open");
      } else {
        chatDisplay.classList.remove("open");
      }
    }
  });

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

      setChatClient( client );
    }

    initChat();

    // return () => {
    //   if (chatClient) chatClient.disconnectUser();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chatClient) return <div>Setting up client & connection...</div>;

  const toggleSidebar = () => {
    setDropdown(false);
    setOpen((prev) => !prev);
  };

  const i18nInstance = new Streami18n({
    language: "en",
    translationsForLanguage: {
      "Connection failure, reconnecting now...":
        "Alert, connection issue happening",
    },
  });

  const handleItemClick = (title) => {
    switch (title) {
      case "New Chat":
        setModal(title);
        break;
      default:
        // Handle other cases here if needed
        break;
    }
  };

  
  const handleClick = (index, title) => {
    setDropdown(false);
    setActiveIndex(index);
    setModal(null);
    handleItemClick(title);
  };
  return (
    <Chat client={chatClient} i18nInstance={i18nInstance}>
      <Navbar open={open} setOpen={setOpen} toggleSidebar={toggleSidebar} />
      <div className="lg:pt-[66px] flex w-full h-screen  fixed top-0 left-0 ">
        {windowWidth <= 768 && (
          <AnimatePresence>
            {open && (
              <ChatBody
                activeIndex={activeIndex}
                setOpen={setOpen}
                handleClick={handleClick}
                open={open}
              />
            )}
          </AnimatePresence>
        )}

        <motion.div
          {...framerSidebarPanel}
          className={`flex flex-col w-full  overflow-y-auto ${
            navCheck ? "" : "pt-[66px] lg:pt-0"
          }  lg:max-w-xs border-r border-lightGray dark:bg-gray-800 bg-white`}
          ref={ref}
          aria-label="Sidebar"
          id="chatlist"
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
        <div className="lg:flex-1 w-full" id="channel">
          <Channel
            DateSeparator={CustomDateSeparator}
            EmojiPicker={EmojiPicker}
            emojiSearchIndex={SearchIndex}
          >
            <Window>
              <CustomChannelHeader />
              <MessageList />
              <MessageInput audioRecordingEnabled />
            </Window>
            <Thread />
          </Channel>
        </div>
      </div>
      {modal === "New chat" && <p>hi there am a modal</p>}
    </Chat>
  );
};

export default JetChat;
