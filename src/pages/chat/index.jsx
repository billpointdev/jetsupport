import { useState, useEffect, useRef } from "react";
import {
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
import Modal from "../../components/profile-screens/reusables/modal";
import LoadingIcon from '../../assets/loading-icon.gif'


const apiKey = import.meta.env.VITE_API_KEY;

const getRandomUser = () => {
  const users = [USER1, USER2, USER3];
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
};

const JetChat = () => {
  const [channel, setChannel] = useState();
  const [chatClient, setChatClient] = useState();
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [navCheck, setNavCheck] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [channels, setChannels] = useState([]); // State to store channels

  const { setOpen: setDropdown } = useProviderContext();

  const location = useLocation();
  useEffect(() => {
    if (modal) {
      const modalIndex = items.findIndex((item) => item.title === modal);
      if (modalIndex !== -1) {
        setActiveIndex(modalIndex);
      }
    } else {
      const pathIndex = items.findIndex((item) => item.href === location.pathname);
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
    async function initChat() {
      const client = StreamChat.getInstance(apiKey);
      const user = getRandomUser();
      await client.connectUser(user, client.devToken(user.id));

      const channels = await client.queryChannels({});
      setChannels(channels); // Set channels to state
      if (channels.length === 0) {
        setShowWelcomeModal(true); // Show welcome modal if no channels exist
      } else {
        setChannel(channels[0]);
      }

      setChatClient(client);
    }

    initChat();

    return () => {
      if (chatClient) chatClient.disconnectUser();
    };
  }, []);

  if (!chatClient) return <div className="flex flex-col justify-center place-items-center h-[100vh]"> <img src={LoadingIcon} alt="Loading" /> </div>;

  const toggleSidebar = () => {
    setDropdown(false);
    setOpen((prev) => !prev);
  };

  const i18nInstance = new Streami18n({
    language: "en",
    translationsForLanguage: {
      "Connection failure, reconnecting now...": "Alert, connection issue happening",
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

  const handleModalClose = () => {
    setShowWelcomeModal(false);
    setModal(null);
  };

  return (
    <Chat client={chatClient} i18nInstance={i18nInstance}>
      <Navbar open={open} setOpen={setOpen} toggleSidebar={toggleSidebar} />
      <div className="lg:pt-[66px] flex w-full h-screen fixed top-0 left-0">
        {windowWidth <= 768 && (
          <AnimatePresence>
            {open && (
              <ChatBody activeIndex={activeIndex} setOpen={setOpen} handleClick={handleClick} open={open} />
            )}
          </AnimatePresence>
        )}

        <motion.div
          {...framerSidebarPanel}
          className={`flex flex-col w-full overflow-y-auto ${navCheck ? "" : "pt-[66px] lg:pt-0"} lg:max-w-xs border-r border-lightGray dark:bg-gray-800 bg-white`}
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
          {channels.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <h2 className="text-xl mb-4">Start a New Chat</h2>
              <p>It looks like you don't have any conversations yet. Click the "New Chat" button to start your first conversation!</p>
            </div>
          ) : (
            <Channel DateSeparator={CustomDateSeparator} EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
              <Window>
                <CustomChannelHeader />
                <MessageList />
                <MessageInput audioRecordingEnabled />
              </Window>
              <Thread />
            </Channel>
          )}
        </div>
      </div>
      {showWelcomeModal && (
        <Modal handleClick={handleModalClose}>
          <div className="p-4 bg-white rounded-lg">
            <h2>Welcome to Jetpay!</h2>
            <p>Your ultimate hub for seamless connections. With our streamlined and comprehensive app, effortlessly engage with others and enjoy convenient interactions, making every transaction a breeze.</p>
            <button onClick={handleModalClose} className="bg-[orangered] text-white px-4 py-2 rounded">
              Continue
            </button>
          </div>
        </Modal>
      )}
      {modal === "New Chat" && (
        <Modal handleClick={handleModalClose}>
          <div className="p-4 bg-white rounded-lg w-full">
            <h2 className="text-center">Start New Chat</h2>
            <ChannelSearch />
            {/* Additional content for starting a new chat */}
          </div>
        </Modal>
      )}
    </Chat>
  );
};

export default JetChat;
