import { useEffect, useState } from "react";
import JetSupportLogo from "../assets/jetsupportcropped.jpg";
import NewChatIcon from "../utils/NewChatIcon";
import NotificationIcon from "../utils/NotificationIcon";
import Proptypes from "prop-types";
import StaggeredDropDown from "../components/profile-screens/utils/dropdown";
import Modal from "../components/profile-screens/reusables/modal";
import NothingHereImg from "../assets/nothing-here-image-notification.gif";
import { useChatContext } from "stream-chat-react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useProviderContext from "../components/profile-screens/hooks/useProvideContext";
import { getChannelColor, getInitials } from "../utils";
import ErrorBot from "../error";
import { FaUser } from "react-icons/fa";
import { truncateText } from "../utils/text";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { client, setActiveChannel } = useChatContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const { isChannelsModalOpen, setIsChannelsModalOpen } = useProviderContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(null);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const fetchAllAdmins = async () => {
    try {
      const response = await client.queryUsers({ role: "staff" }, { id: -1 });
      return response.users;
    } catch (error) {
      console.error("Error fetching admins:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const allAdmins = await fetchAllAdmins();
      const mergedUsers = [...allAdmins];
      const excludeNames = [
        "Billpoint Dev",
        "Deep Foxf",
        "Francis John",
        "Deepp Fox",
        "Reall John",
        "Abasifreke Essien",
        "Staff Essien"
      ];
      const filteredUsers = mergedUsers.filter(
        (user) => !excludeNames.includes(user.name)
      );

      const sortedUsers = filteredUsers.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setUsers(sortedUsers);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userId = userInfo?.user?.chat_id;
  //  console.log(userInfo.chat_id);
  // Function to handle starting a new chat with a selected user
  const startNewChat = async (selectedUser) => {
    try {
      const members = [userId, selectedUser.id];
      const channel = client.channel("messaging", {
        name: selectedUser?.name,
        image: selectedUser.image,
        members,
      });

      setActiveChannel(channel);

      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error("Error starting new chat:", error);
    }
  };

  const openChannelsModal = () => {
    if (window.location.pathname === "/chat") {
      setIsChannelsModalOpen(true);
    } else {
      setError("Oops! Please go to the chat page to create new chats.");
      // navigate("/chat")
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsChannelsModalOpen(false);
  };

  const notifications = [
    // ... your notifications here ...
  ];

  const openClearNotificationsModal = () => {
    setModalContent();
    // ... your modal content here ...
    setIsModalOpen(true);
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <header
      className="fixed dark:bg-dark dark:text-white bg-white left-0 top-0 z-50 w-full h-[66px] border-b"
      id="navbar"
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="hidden lg:block text-teal-600" to="/">
          <span className="sr-only">Home</span>
          <img src={JetSupportLogo} alt="" className="w-[52px] h-[49px]" />
        </Link>
        <button
          className="block rounded p-2.5 dark:text-white dark:hover:text-white text-gray-600 transition hover:text-gray-600/75 lg:hidden"
          onClick={toggleSidebar}
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:flex items-center">
            <div className="w-12 h-12 flex rounded-full border-2 border-gray-300  items-center justify-center overflow-hidden">
              {userInfo?.user?.picture ? (
                <img
                  src={userInfo?.user?.picture}
                  alt="avatar"
                  className="w-full h-full object-cover" // Ensure the image covers the div area
                />
              ) : (
                <FaUser className="text-gray-300 w-full h-full" /> // Center icon if no image
              )}
            </div>
            <div className="hidden lg:block text-center sm:text-left ml-1">
              <h1 className="dark:text-white sm:text-2xl font-inter">
                {getGreeting()},
                <span className="text-[#010E0E] dark:text-white font-bold">
                  {truncateText(userInfo?.user?.firstname,5)}
                </span>{" "}
                👋
              </h1>
              <p className="text-xs text-[#616161] dark:text-white">
                What would you like to buy or sell today?
              </p>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div
                className="flex rounded-full gap-2 bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/75 cursor-pointer"
                onClick={openChannelsModal}
              >
                <NewChatIcon /> New Chat
              </div>
              <div className="relative">
                <button
                  className="hidden rounded-full bg-gray-100 px-2.5 py-2.5 text-sm font-medium text-teal-600 transition hover:bg-gray-200 sm:block"
                  onClick={toggleNotificationDropdown}
                >
                  <NotificationIcon />
                </button>
                {isNotificationDropdownOpen && (
                  <div className="absolute top-[60px] right-[-80px] mt-2 w-80 h-fit bg-white border rounded-2xl shadow-lg pt-4">
                    <h4 className="text-left text-[#171D33] font-inter font-medium text-base ml-4">
                      Notifications
                    </h4>
                    <div className="">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-100"
                          >
                            <div className="w-10 h-10 border-2 overflow-hidden border-primary rounded-full">
                              <img
                                className="w-full h-full object-cover"
                                src={notification.img}
                                alt="notification_image"
                              />
                            </div>
                            <span className="text-sm w-[220px] line-clamp-2">
                              {notification.message}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center pb-10">
                          <div>
                            <img
                              src={NothingHereImg}
                              alt="nothing here notification"
                            />
                          </div>
                          <h4 className="font-inter dark:text-[#000] font-semibold text-lg my-1">
                            No Notifications yet
                          </h4>
                          <p className="font-inter dark:text-[#000] text-base max-w-[350px]">
                            Looks like there&apos;s no recent activity to show
                            here.
                          </p>
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-2">
                        <button
                          className="w-full text-center text-sm font-medium border border-primary py-2 rounded-full text-primary transition duration-300 ease-in-out hover:bg-primary hover:text-white transform hover:scale-95"
                          onClick={openClearNotificationsModal}
                        >
                          Clear Notifications
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <StaggeredDropDown />
          </div>
        </div>
        {isModalOpen && (
          <Modal handleClick={handleCloseModal}>{modalContent}</Modal>
        )}
        {isChannelsModalOpen && (
          <Modal handleClick={handleCloseModal}>
            <div className="bg-white sm:w-[348px] md:w-96 text-center h-[515px] flex flex-col mt-14 rounded-[24px] p-4 py-3 ">
              <div className="flex flex-col  ">
                <p className="font-inter mt-3 font-semibold dark:text-dark text-lg">
                  Start New Chat
                </p>
                {/* // searchbar */}
                <div className="border-none sm:w-[320px] min-w-[320px] bg-[#fafafa] flex rounded-md items-center px-2.5 my-3">
                  <CiSearch />
                  <input
                    type="search"
                    className="w-full border-0 bg-transparent h-full outline-none text-[#757575] text-sm py-3 px-2.5"
                    value={searchQuery}
                    placeholder="Search conversations"
                    onChange={(event) => setSearchQuery(event.target.value)}
                    // onKeyDown={(event) => {
                    //   if (event.key === "Enter") {
                    //     event.preventDefault();
                    //     handleSearch(event);
                    //   }
                    // }}
                  />
                </div>
                <div className="overflow-y-auto  h-[376px] w-full mt-1">
                  {searchQuery
                    ? filteredUsers.map((user) => {
                        const channelName = user?.name
                          ? user?.name
                          : "Unnamed Channel";
                        const channelColor = getChannelColor(channelName);
                        return (
                          <div
                            key={user.id}
                            onClick={() => startNewChat(user)}
                            className="flex items-center justify-between cursor-pointer px-2 my-2"
                          >
                            {/* Display user profile */}
                            <div className="flex items-center">
                              {user?.image ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden border">
                                  <img
                                    src={user?.image}
                                    alt="user_image"
                                    className="w-full h-full object-fit"
                                  />
                                </div>
                              ) : (
                                <div
                                  className={`w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center`}
                                  style={{ backgroundColor: channelColor }}
                                >
                                  {getInitials(
                                    user?.name ? user?.name : "Anonymous"
                                  )}
                                </div>
                              )}
                              <p className="ml-4 capitalize dark:text-dark whitespace-nowrap">
                                {user?.name}
                              </p>
                            </div>
                            <div className="h-8 w-8 rounded-full border   flex items-center justify-center">
                              <MdOutlineKeyboardArrowRight className="text-sm text-gray-700" />
                            </div>
                          </div>
                        );
                      })
                    : users.map((user) => {
                        return (
                          <div
                            key={user?.id}
                            onClick={() => startNewChat(user)}
                            className="flex items-center justify-between cursor-pointer px-2 my-2"
                          >
                            {/* Display user profile */}
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex rounded-full border-2 border-gray-300  items-center justify-center overflow-hidden">
                                {user?.image ? (
                                  <img
                                    src={user?.image}
                                    alt="avatar"
                                    className="w-full h-full object-cover" // Ensure the image covers the div area
                                  />
                                ) : (
                                  <FaUser className="text-gray-300 w-full h-full" /> // Center icon if no image
                                )}
                              </div>
                              <p className="ml-4 capitalize dark:text-dark whitespace-nowrap">
                                {truncateText(user?.name, 28)}
                              </p>
                            </div>
                            <div className="h-8 w-8 rounded-full border   flex items-center justify-center">
                              <MdOutlineKeyboardArrowRight className="text-sm text-gray-700" />
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
      {error && <ErrorBot error={error} />}
    </header>
  );
};

Navbar.propTypes = {
  toggleSidebar: Proptypes.func.isRequired,
};

export default Navbar;
