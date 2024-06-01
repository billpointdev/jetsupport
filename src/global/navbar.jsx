import { useState } from "react";
import JetSupportLogo from "../assets/jetsupportcropped.jpg";
import NewChatIcon from "../utils/NewChatIcon";
import NotificationIcon from "../utils/NotificationIcon";
import Proptypes from "prop-types";
import StaggeredDropDown from "../components/profile-screens/utils/dropdown";
import { useNavigate } from "react-router-dom";
import Modal from "../components/profile-screens/reusables/modal";
import InfoCircleIcon from "../utils/InfoCircle";
import NothingHereImg from "../assets/nothing-here-image-notification.gif";
import { useSelector } from "react-redux";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
const { userInfo } = useSelector(
  (state) => state.auth
);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const notifications = [
    {
      id: 1,
      img: JetSupportLogo,
      message:
        "Time to trade! Don't miss out on the latest crypto prices on Jet Support web app. Start trading now",
    },
    {
      id: 2,
      img: JetSupportLogo,
      message:
        "Crypto prices are on the rise! Open your Jet Support web app and make a move now to maximize your profit.",
    },
    {
      id: 3,
      img: JetSupportLogo,
      message:
        "Jet Support web app is here to offer you the best crypto trading experience. Buy and sell crypto with ease and get real-time notifications for market updates.",
    },
  ];

  const openClearNotificationsModal = () => {
    setModalContent(

      <div className="bg-white sm:w-[348px] md:w-96 text-center h-[315px] flex flex-col justify-center mt-14 rounded-[24px] p-4 py-3 " >
        <div className="flex items-center justify-center">
          <div className="flex justify-center items-center bg-[#f5f5f5] h-16 w-16 rounded-full p-0.5">
            <InfoCircleIcon />
          </div>
        </div>
        <div className="mt-7">
          <p> Clear All Notifications</p>
          <p className="text-[#757575]">
            By clearing your account notifications you loose all your Jetsupport
            notifications.
          </p>
        </div>
        <div className="mt-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={clearNotifications}
              className={`block w-full rounded-[16px] text-sm md:text-md  bg-[#F5F5F5] px-6 py-4 font-medium transform  hover:scale-95 transition-transform duration-300`}
            >
              Close
            </button>
            <button
              type="button"
              onClick={clearNotifications}
              className={`block w-full rounded-[16px] text-white whitespace-nowrap text-md  bg-primary px-6 py-4 font-medium transform  hover:scale-95 transition-transform duration-300`}
            >
              Clear Notifications
            </button>
            
          </div>
        </div>
      </div>
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const clearNotifications = () => {
    // will implement logic to clear notifications here
    console.log("Notifications cleared");
    setIsModalOpen(false);
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
      className=" fixed dark:bg-dark dark:text-white bg-white left-0 top-0 z-50  w-full h-[66px] border-b"
      id="navbar"
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="hidden lg:block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <img src={JetSupportLogo} alt="" className="w-[52px] h-[49px]" />
        </a>
        <button
          className="block rounded  p-2.5 dark:text-white dark:hover:text-white text-gray-600 transition hover:text-gray-600/75 lg:hidden"
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
            <div className="hidden lg:block w-12 h-12 rounded-full border">
              <img
                src={userInfo?.picture}
                alt=""
                className="object-cover h-full w-full"
              />
            </div>
            <div className="hidden lg:block text-center sm:text-left ml-1">
              <h1 className="  dark:text-white sm:text-2xl font-inter">
                {getGreeting()},{" "}
                <span className=" text-[#010E0E] dark:text-white font-bold ">
                  {userInfo?.firstname}
                </span>{" "}
                👋
              </h1>

              <p className=" text-xs text-[#616161] dark:text-white">
                What would you live to buy or sell today?
              </p>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div
                className="flex rounded-full gap-2  bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/75 cursor-pointer"
                onClick={() => navigate("/chat")}
              >
                <NewChatIcon /> New Chat{" "}
              </div>
              <div className="relative">
                <button
                  className="hidden rounded-full bg-gray-100 px-2.5 py-2.5 text-sm font-medium text-teal-600 transition hover:bg-gray-200  sm:block"
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
                      {!notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="flex items-center gap-2  py-2 px-4 cursor-pointer hover:bg-gray-100"
                          >
                            <div className="w-10 h-10 border-2 overflow-hidden border-primary rounded-full">
                              <img
                                className="w-full h-full object-cover "
                                src={notification.img}
                                alt="notification-image"
                              />
                            </div>
                            <span className="text-sm w-[220px]  line-clamp-2 ">
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
                          <h4 className="font-inter font-semibold text-lg my-1">
                            No Notifications yet
                          </h4>
                          <p className="font-inter text-base max-w-[350px]">
                            Looks like there&apos;s no recent activity to show
                            here.{" "}
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
      </div>
    </header>
  );
};

Navbar.propTypes = {
  open: Proptypes.bool.isRequired,
  setOpen: Proptypes.func.isRequired,
  toggleSidebar: Proptypes.func.isRequired,
};

export default Navbar;
