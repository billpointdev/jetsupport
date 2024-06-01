import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import Proptypes from "prop-types";
import { RiArrowRightSLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";
// import { IoSettingsOutline } from "react-icons/io5";
// import { TbMessage2 } from "react-icons/tb";
import { IoExit } from "react-icons/io5";
import useProviderContext from "../hooks/useProvideContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../features/auth/authActions";
import ErrorBot from "../../../error";
const StaggeredDropDown = () => {
  const { open, setOpen } = useProviderContext();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  // const { triggerLogoutModal } = useLogout();
  const handleSignOut = async (data) => {
    setOpen(false);
    // setShowLogoutModal(true);
    try {
      const response = await dispatch(logOut(data)).unwrap();
      console.log(response.data);
    } catch (error) {
      console.log("responseError", error.message);
      setError(error?.message);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".staggered-dropdown") &&
        !event.target.closest(".dropdown-button")
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setOpen]);

  return (
    <div className=" flex items-center staggered-dropdown justify-center bg-grey-800">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 rounded-md  transition-colors"
        >
          <span className="font-medium text-sm  w-12 h-12 rounded-full">
            <img
              src={userInfo?.picture}
              className="object-cover w-full h-full"
              alt="avatar"
            />
          </span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-[#f5f5f5] z-10  shadow-md absolute top-[120%] -left-[25%] md:left-[1%] w-48 overflow-hidden"
        >
          <div className="bg-white p-2 w-full  rounded-lg">
            <div className="flex items-center">
              <img
                src={userInfo?.picture}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-400 "
              />
              <div className="ml-1 text-start">
                <p className="text-[#010E0E] text-[12px]">
                  {userInfo?.firstname} {userInfo?.lastname}
                </p>
                <p className="text-[9px] text-[#616161] leading-1">
                  {userInfo?.email.substring(0, 18)}...
                </p>
              </div>
            </div>
            <div className="mt-3">
              <Option
                setOpen={setOpen}
                Icon={HiOutlineUser}
                text="Your Profile"
                route="/profile"
              />
              {/* <Option
                setOpen={setOpen}
                Icon={IoSettingsOutline}
                text="Acccount Settings"
              />
              <Option
                setOpen={setOpen}
                Icon={TbMessage2}
                text="Contact Support"
              /> */}
            </div>
          </div>
          <div
            onClick={() => handleSignOut()}
            className="flex justify-between w-full pr-1 cursor-pointer focus:bg-[#f5f5f5]"
          >
            <div className="flex items-center text-[#FF3B3B] font-medium whitespace-nowrap  gap-5 ">
              <motion.div>
                <IoExit className="rotate-180 text-md" />
              </motion.div>
              <motion.span className="text-xs">Sign out</motion.span>
            </div>
            <div className="h-8 w-8 rounded-full border-2 dark:text-white flex items-center justify-center">
              <RiArrowRightSLine className="text-lg" />
            </div>
          </div>
        </motion.ul>
      </motion.div>
      {error && <ErrorBot error={error} />}
    </div>
  );
};

const Option = ({ text, Icon, setOpen, route }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(false);
    if (route) {
      navigate(route);
    }
  };

  return (
    <motion.li
      variants={itemVariants}
      onClick={handleClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[#FAFAFA] text-slate-700 hover:text-primary transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

Option.propTypes = {
  Icon: Proptypes.elementType.isRequired,
  text: Proptypes.string.isRequired,
  setOpen: Proptypes.func.isRequired,
  route: Proptypes.string,
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
