import { useEffect, useMemo, useState } from "react";
import Navbar from "../../global/navbar";
import Sidebar, { SidebarLg } from "../../global/sidebar";
import Proptypes from "prop-types";
import { HiUser } from "react-icons/hi2";
import { FiShoppingCart } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { RiSettingsFill } from "react-icons/ri";
import { GoBellFill } from "react-icons/go";
import SupportIcon from "../../utils/SupportIcon";
import Delete from "../../utils/Delete";
import { useLocation } from "react-router-dom";
import OtpModal from "../../components/profile-screens/modals/otp-modal";
import SecurityPin from "../../components/profile-screens/modals/security-pin";
import ResetPassword from "../../components/profile-screens/modals/reset-password";
import LogoutModal from "../../components/profile-screens/modals/logout-modal";
import useProviderContext from "../../components/profile-screens/hooks/useProvideContext";

const ProfilePage = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const { showLogoutModal } = useProviderContext();

  const toggleSidebar = () => setOpen((prev) => !prev);
  const location = useLocation();

  const handleClick = (index, title) => {
    setActiveIndex(index);
    setModal(null);
    handleItemClick(title);
  };

   const darkModeHandler = () => {
     setDarkMode((prev) => {
       const newDarkMode = !prev;
       localStorage.setItem("darkMode", newDarkMode);
       document.body.classList.toggle("dark", newDarkMode);
       return newDarkMode;
     });
   };
    
  const handleItemClick = (title) => {
    switch (title) {
      case "Reset security PIN":
        setModal(title);
        break;
      case "Reset password":
        setModal(title);
        break;
      case "Help & Support":
        setModal(title);
        break;
      default:
        // Handle other cases here if needed
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      if (isLargeScreen) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleContinue = () => {
    setConfirmed(true); // Set confirmed after security checks
  };

  const items = useMemo(
    () => [
      { title: "Personal Information", Icon: HiUser, href: "/profile" },
      { title: "Notifications", Icon: GoBellFill, href: "/notifications" },
      { title: "Reset security PIN", Icon: HiUser },
      { title: "Reset password", Icon: RiSettingsFill },
      { title: "Help & Support", Icon: SupportIcon, href: "/help-support" },
      { title: "Privacy Policy", Icon: FiShoppingCart, href: "#" },
      { title: "Dark Mode", Icon: FaEye, href: "#" },
      { title: "Delete account", Icon: Delete, href: "/delete-account" },
    ],
    []
  );

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
  }, [ location, items, modal ] );
    
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark", savedDarkMode);

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (
      prefersDarkScheme.matches &&
      localStorage.getItem("darkMode") === null
    ) {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div className="fixed dark:bg-gray-800 bottom-0 z-50 left-0 right-0 top-0 w-full flex lg:h-screen overflow-hidden">
      <Navbar open={open} setOpen={setOpen} toggleSidebar={toggleSidebar} />
      <div className="  w-full flex lg:h-screen  ">
        <SidebarLg
          activeIndex={activeIndex}
          handleClick={handleClick}
          items={items}
          open={open}
          darkModeHandler={darkModeHandler}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Sidebar
          open={open}
          setOpen={setOpen}
          activeIndex={activeIndex}
          handleClick={handleClick}
          items={items}
          darkModeHandler={darkModeHandler}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <div className=" dark:bg-gray-800 flex-1 mt-[66px] overflow-y-auto ">
          {children}
        </div>
      </div>
      {modal && !confirmed && (
        <OtpModal setModal={setModal} handleContinue={handleContinue} />
      )}
      {modal === "Reset security PIN" && confirmed && (
        <SecurityPin setModal={setModal} setConfirmed={setConfirmed} />
      )}
      {modal === "Reset password" && confirmed && (
        <ResetPassword setModal={setModal} setConfirmed={setConfirmed} />
      )}
      {showLogoutModal && <LogoutModal />}
    </div>
  );
};

ProfilePage.propTypes = {
  children: Proptypes.node.isRequired,
};

export default ProfilePage;
