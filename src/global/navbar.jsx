import { useState } from "react";
import JetSupportLogo from "../assets/jetsupportcropped.png";
import avatar from "../assets/frameimage.png";
import NewChatIcon from "../utils/NewChatIcon";
import NotificationIcon from "../utils/NotificationIcon";
import Proptypes from "prop-types";
import StaggeredDropDown from "../components/profile-screens/utils/dropdown";
import { useNavigate } from "react-router-dom";
import Modal from '../components/profile-screens/reusables/modal';
import InfoCircleIcon from "../utils/InfoCircle";
import DownloadButton from "../components/reusables/DownloadButton";
import NothingHereImg from '../assets/nothing-here-image-notification.gif'


const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate()

  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);

  };

  const notifications = [
    { id: 1, img: JetSupportLogo, message: "Time to trade! Don't miss out on the latest crypto prices on JetPay app. Start trading now" },
    { id: 2, img: JetSupportLogo, message: "Crypto prices are on the rise! Open your JetPay app and make a move now to maximize your profit." },
    { id: 3, img: JetSupportLogo, message: "JetPay app is here to offer you the best crypto trading experience. Buy and sell crypto with ease and get real-time notifications for market updates." },

  ];

  const openClearNotificationsModal = () => {
    setModalContent(
      <div className="text-center place-items-center bg-white w-full h-full flex flex-col gap-2 mt-14 rounded-[24px] p-4 pt-10">
        <InfoCircleIcon />
        <h4 className="font-inter font-semibold text-lg my-1">
          Clear All Notifications
        </h4>
        <p className="font-inter text-base max-w-[350px]">By clearing your account notifications you loose all your Jetpay notifications.</p>
        <div className='mt-16 w-full flex justify-between gap-4'>
          <DownloadButton
            onClick={clearNotifications}
            buttonText="Close"
            padding={"px-20"}
            width={"w-[100%]"}
            bgColor={"bg-[#F5F5F5]"}
            textColor={"text-[#424242]"}
          />

          <DownloadButton
            onClick={clearNotifications}
            buttonText="Clear Notifications"
            padding={"px-20"}
            width={"w-[100%]"}
            bgColor={"bg-primary"}
            textColor={"text-white"}
          />
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

  return (
    <header className=" fixed dark:bg-gray-800 dark:text-white bg-white left-0 top-0 z-50  w-full h-[66px] border-b">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <a className="hidden lg:block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <img src={JetSupportLogo} alt="" className="w-[56px] h-[49px]" />
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
              <img src={avatar} alt="" className="object-cover h-full w-full" />
            </div>
            <div className="hidden lg:block text-center sm:text-left ml-1">
              <h1 className="  dark:text-white sm:text-2xl font-inter">
                Good Morning,{" "}
                <span className=" text-[#010E0E] dark:text-white font-bold ">Quine</span> 👋
              </h1>

              <p className=" text-xs text-[#616161] dark:text-white">
                What would you live to buy or sell today?
              </p>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div
                className="flex rounded-full gap-2  bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary/75"
                onClick={() => navigate("/chat")}
              >
                <NewChatIcon /> New Chat{" "}
              </div>
              <div className="relative">
                <button
                  className="hidden rounded-full bg-gray-100 px-2.5 py-2.5 text-sm font-medium text-teal-600 transition hover:bg-primary/75  sm:block"
                  onClick={toggleNotificationDropdown}
                >
                  <NotificationIcon />
                </button>
                {isNotificationDropdownOpen && (          
                  <div className="absolute top-[60px] right-[-80px] mt-2 w-96 h-fit bg-white border rounded-3xl shadow-lg p-4">
                    <h4 className="text-left text-[#171D33] font-inter font-bold text-base">Notifications</h4>
                    <div className="p-4">
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100"
                          >
                            <img className=" w-16 h-16 rounded-full" src={notification.img} alt="" />
                            <span className="text-sm">{notification.message}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center pb-10">
                          <div>
                            <img src={NothingHereImg} alt="nothing here notification" />
                          </div>
                          <h4 className="font-inter font-semibold text-lg my-1">No Notifications yet</h4>
                          <p  className="font-inter text-base max-w-[350px]">Looks like there's no recent activity to show here. </p>
                        </div>
                      )}                     
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-2 border-t">
                      <button
                        className="w-full text-center text-sm font-medium text-primary hover:bg-gray-100"
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
          <Modal handleClick={handleCloseModal}>
            {modalContent}
          </Modal>
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
