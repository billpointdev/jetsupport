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
  useCreateChatClient,
} from "stream-chat-react";
import { EmojiPicker } from "stream-chat-react/emojis";
import { SearchIndex } from "emoji-mart";
import { AnimatePresence, motion } from "framer-motion";
import "stream-chat-react/dist/css/v2/index.css";
import Navbar from "../../global/navbar";
import { CustomChannelPreview } from "../../components/chat/custom-channel-preview";
import useProviderContext from "../../components/profile-screens/hooks/useProvideContext";
import { framerSidebarPanel, items } from "../../utils";
import { CustomSearch } from "../../components/chat/custom-search-bar";
import { CustomChannelList } from "../../components/chat/search/custom-channel-list";
import { CustomChannelHeader } from "../../components/chat/channel-header";
import ChatBody from "../../components/chat/chat-body";
import { useLocation } from "react-router-dom";
import { CustomDateSeparator } from "../../components/chat/date-separator";
import Modal from "../../components/profile-screens/reusables/modal";
import LoadingIcon from "../../assets/loading-icon.gif";
import Button from "../../components/profile-screens/reusables/button";
import JetSupportLogo from "../../assets/jetsupportcropped.jpg";

const apiKey = import.meta.env.VITE_API_KEY;

const JetChat = () => {
  // const [chatClient, setChatClient] = useState();
  const [open, setOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [navCheck, setNavCheck] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  // const [channels, setChannels] = useState([]); // State to store channels
  const { setOpen: setDropdown, setIsChannelsModalOpen } = useProviderContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
         if (window.innerWidth <= 425) {
           chatDisplay.classList.add("open");
         } else {
           chatDisplay.classList.remove("open");
         }
       }


   }, []);

  useEffect(() => {
    const chatDisplay = document.querySelector("#channel");

    if (chatDisplay) {
      if (window.innerWidth <= 425) {
        chatDisplay.classList.add("open");
      } else {
        chatDisplay.classList.remove("open");
      }
    }
  }, [window.innerWidth]);

  const userId = userInfo?.user?.chat_id;
  const token = userInfo?.chat_token;

  const filters = { members: { $in: [userId] }, type: "messaging" };
  const options = { presence: true, state: true };
  const sort = { last_message_at: -1 };

  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId },
  });

  console.log("useriNFO", userInfo.user);

  if (!client)
    return (
      <div className="flex flex-col justify-center place-items-center h-[100vh]">
        {" "}
        <img src={LoadingIcon} alt="Loading" />{" "}
      </div>
    );

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
        setOpen( false );
        setIsChannelsModalOpen( true );
        break;
      default:
        // Handle other cases here if needed
        break;
    }
  };

  const handleClick = (index, title) => {
    setDropdown(false);
    setActiveIndex(index);
    setModal( null );
  
    handleItemClick(title);
  };

  const handleModalClose = () => {
    setShowWelcomeModal(false);
    setModal(null);
  };

  return (
    <Chat client={client} i18nInstance={i18nInstance}>
      <Navbar open={open} setOpen={setOpen} toggleSidebar={toggleSidebar} />
      <div className="lg:pt-[66px] flex w-full  h-screen fixed top-0 left-0">
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
          className={`flex flex-col w-full h-full overflow-y-auto ${
            navCheck ? "" : "pt-[66px] lg:pt-0"
          } lg:max-w-xs border-r border-lightGray  bg-white`}
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
            sort={sort}
            filters={filters}
            options={options}
          />
        </motion.div>
        <div
          className={`lg:flex-1 w-full ${
            window.innerWidth <= 425 ? "open" : ""
          } `}
          id="channel"
        >
          {/*
          {channels.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <h2 className="text-xl mb-4">Start a New Chat</h2>
              <p>
                It looks like you don't have any conversations yet. Click the
                &quot;New Chat&quot; button to start your first conversation!
              </p>
            </div>
          ) : ( */}
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
        {/* )}
        </div> */}
      </div>
      {showWelcomeModal && (
        <Modal handleClick={handleModalClose}>
          <div className="bg-white sm:w-[348px] md:w-96 text-center h-[345px] flex flex-col justify-center mt-14 rounded-[24px] p-4 py-3 ">
            <div className="flex flex-col items-center">
              <img src={JetSupportLogo} alt="jet-logo" className="w-20 h-20" />
              <h2 className="font-inter font-semibold text-lg mt-2">
                Welcome to Jet Support!
              </h2>
              <p className="text-[#828282] text-md font-inter leading-5">
                Your ultimate hub for seamless connections. With our streamlined
                and comprehensive app, effortlessly engage with others and enjoy
                convenient interactions, making every transaction a breeze.
              </p>
            </div>

            <Button
              type="submit"
              onClick={handleModalClose}
              title="Continue"
              className="mt-10"
            />
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
