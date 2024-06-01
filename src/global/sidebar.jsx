import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import ExitIcon from "../utils/ExitIcon";
import useLogout from "../components/profile-screens/hooks/useLogout";
import Toggler from "../components/profile-screens/reusables/toggler";

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};

const Sidebar = ({
  open,
  setOpen,
  activeIndex,
  handleClick,
  items,
  darkModeHandler,
  darkMode,
}) => {
  const ref = useRef(null);
  const toggleSidebar = (idx, title) => {
    handleClick(idx, title);
    setOpen((prev) => !prev);
  };
  const { triggerLogoutModal } = useLogout();

  return (
    <AnimatePresence mode="wait" initial={true}>
      {open && (
        <>
          <motion.div
            {...framerSidebarBackground}
            aria-hidden="true"
            className=" "
          ></motion.div>
          <motion.div
            {...framerSidebarPanel}
            className="flex lg:hidden flex-col fixed z-10 w-full justify-between overflow-y-auto h-screen p-2 max-w-xs border-r border-lightGray  dark:bg-dark bg-white"
            ref={ref}
            aria-label="Sidebar"
          >
            <div className="mt-[66px]">
              <p className="text-start text-[#616161] dark:text-white text-sm mt-5 ml-5">
                General settings
              </p>
              <ul>
                {items.map((item, idx) => {
                  const { title, href, Icon } = item;
                  return (
                    <li key={title}>
                      {title === "Dark Mode" ? (
                        <div
                          className={`flex items-center mt-4 justify-between gap-5 py-5 pl-5 w-[300px] pr-1 transition-all  rounded-full h-[50px]  ${
                            idx === activeIndex
                              ? "bg-[#F5F5F5] border "
                              : "dark:text-white"
                          }`}
                        >
                          <div className="flex items-center  cursor-pointer gap-5">
                            <motion.div {...framerIcon}>
                              <Icon className="text-2xl" />
                            </motion.div>
                            <motion.span {...framerText(idx)}>
                              {title}
                            </motion.span>
                          </div>
                          <Toggler
                            id="darkModeToggle"
                            checked={darkMode}
                            onChange={darkModeHandler}
                          />
                        </div>
                      ) : (
                        <Link
                          onClick={() => toggleSidebar(idx, title)}
                          to={href}
                          className={`flex items-center mt-4 justify-between gap-5 py-5 pl-5 w-[300px] pr-1 transition-all  rounded-full h-[50px]  ${
                            idx === activeIndex
                              ? "bg-[#F5F5F5] border dark:bg-[#FFCBAF] dark:border-[#F66B03] dark:text-dark"
                              : "dark:text-white"
                          }`}
                        >
                          <div className="flex items-center cursor-pointer gap-5">
                            <motion.div {...framerIcon}>
                              <Icon className="text-2xl" />
                            </motion.div>
                            <motion.span {...framerText(idx)}>
                              {title}
                            </motion.span>
                          </div>

                          <div className="h-10 w-10 rounded-full border  flex items-center justify-center">
                            <RiArrowRightSLine className="text-lg" />
                          </div>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              onClick={triggerLogoutModal}
              className="flex justify-between lg:mb-4 py-5 pl-5 w-[300px] pr-1 cursor-pointer focus:bg-[#f5f5f5]"
            >
              <div className="flex items-center text-[#FF3B3B] gap-5 ">
                <motion.div {...framerIcon}>
                  <ExitIcon />
                </motion.div>
                <motion.span {...framerText(1)}>Sign out</motion.span>
              </div>
              <div className="h-10 w-10 rounded-full border dark:text-white flex items-center justify-center">
                <RiArrowRightSLine className="text-lg" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Sidebar.propTypes = {
  open: Proptypes.bool.isRequired,
  setOpen: Proptypes.func.isRequired,
  activeIndex: Proptypes.number.isRequired,
  handleClick: Proptypes.func.isRequired,
  items: Proptypes.array,

  darkModeHandler: Proptypes.func.isRequired,
  darkMode: Proptypes.bool.isRequired,
};

export default Sidebar;

export const SidebarLg = ({
  activeIndex,
  handleClick,
  items,
  open,
  darkModeHandler,
  darkMode,
}) => {
  const ref = useRef(null);
  const { triggerLogoutModal } = useLogout();
  

  return (
    <>
      {!open && (
        <AnimatePresence mode="wait" initial={true}>
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className=" "
            ></motion.div>
            <motion.div
              {...framerSidebarPanel}
              className="hidden lg:flex flex-col  w-full justify-between overflow-y-auto h-screen p-2 max-w-xs border-r border-lightGray dark:bg-dark bg-white"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="mt-[66px]">
                <p className="text-start text-[#616161] dark:text-white text-sm mt-5 ml-5">
                  General settings
                </p>
                <ul>
                  {items.map((item, idx) => {
                    const { title, href, Icon } = item;
                    return (
                      <li key={title}>
                        {title === "Dark Mode" ? (
                          <div
                            className={`flex items-center mt-4 justify-between gap-5 py-5 pl-5 w-[300px] pr-1 transition-all  rounded-full h-[50px]  ${
                              idx === activeIndex
                                ? "bg-[#F5F5F5]  border "
                                : "dark:text-white"
                            }`}
                          >
                            <div className="flex items-center  cursor-pointer gap-5">
                              <motion.div {...framerIcon}>
                                <Icon className="text-2xl" />
                              </motion.div>
                              <motion.span {...framerText(idx)}>
                                {title}
                              </motion.span>
                            </div>
                            <Toggler
                              id="darkModeToggle"
                              checked={darkMode}
                              onChange={darkModeHandler}
                            />
                          </div>
                        ) : (
                          <Link
                            onClick={() => handleClick(idx, title)}
                            to={href}
                            className={`flex items-center mt-4 justify-between gap-5 py-5 pl-5 w-[300px] pr-1 transition-all  rounded-full h-[50px]  ${
                              idx === activeIndex
                                ? "bg-[#F5F5F5] border dark:bg-[#FFCBAF] dark:border-[#F66B03] dark:text-dark"
                                : "dark:text-white"
                            }`}
                          >
                            <div className="flex items-center cursor-pointer gap-5">
                              <motion.div {...framerIcon}>
                                <Icon className="text-2xl" />
                              </motion.div>
                              <motion.span {...framerText(idx)}>
                                {title}
                              </motion.span>
                            </div>

                            <div className="h-10 w-10 rounded-full border  flex items-center justify-center">
                              <RiArrowRightSLine className="text-lg" />
                            </div>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                onClick={triggerLogoutModal}
                className="flex justify-between lg:mb-4 py-5 pl-5 w-[300px] pr-1 cursor-pointer focus:bg-[#f5f5f5]"
              >
                <div className="flex items-center text-[#FF3B3B] gap-5 ">
                  <motion.div {...framerIcon}>
                    <ExitIcon />
                  </motion.div>
                  <motion.span {...framerText(1)}>Sign out</motion.span>
                </div>
                <div className="h-10 w-10 rounded-full border dark:text-white flex items-center justify-center">
                  <RiArrowRightSLine className="text-lg" />
                </div>
              </div>
            </motion.div>
          </>
        </AnimatePresence>
      )}
    </>
  );
};

SidebarLg.propTypes = {
  activeIndex: Proptypes.number.isRequired,
  handleClick: Proptypes.func.isRequired,
  items: Proptypes.array,
  open: Proptypes.bool.isRequired,
  darkModeHandler: Proptypes.func.isRequired,
  darkMode: Proptypes.bool.isRequired,
};
