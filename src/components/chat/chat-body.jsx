import { useRef } from "react";
import { framerIcon, framerSidebarPanel, framerText, items } from "../../utils";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";

const ChatBody = ({ handleClick, setOpen, activeIndex }) => {
  // make sidebaar swipeable
  //   const [startX, setStartX] = useState(null);
  //   const [offsetX, setOffsetX] = useState(0);
  const ref = useRef();

  //   const handleTouchStart = (e) => {
  //     setStartX(e.touches[0].clientX);
  //   };

  //   const handleTouchMove = (e) => {
  //     if (!startX) return;

  //     const currentX = e.touches[0].clientX;
  //     const deltaX = currentX - startX;
  //     setOffsetX(deltaX);
  //   };

  //   const handleTouchEnd = () => {
  //     setStartX(null);
  //     setOffsetX(0);
  //   };

  const toggleSidebar = (idx, title) => {
    handleClick(idx, title);
    setOpen((prev) => !prev);
  };

  return (
    <AnimatePresence>
      {/* //   <motion.div
    //     key="chat-body"
    //     onTouchStart={handleTouchStart}
    //     onTouchMove={handleTouchMove}
    //     onTouchEnd={handleTouchEnd}
    //     style={{
    //       transform: `translateX(${offsetX}px)`,
    //       transition: startX ? "none" : "transform 0.3s ease",
    //     }}
    //   > */}
      <motion.div
        key="sidebar"
        {...framerSidebarPanel}
        className={`fixed left-0 top-0 flex z-10 flex-col w-full  justify-between overflow-y-auto h-screen pt-[66px] max-w-xs border-r border-lightGray dark:bg-gray-800 bg-white`}
        ref={ref}
        aria-label="Sidebar"
      >
        <ul>
          {items.map((item, idx) => {
            const { title, href, Icon } = item;
            return (
              <li key={title}>
                <Link
                  onClick={() => toggleSidebar(idx, title)}
                  to={href}
                  className={`flex items-center mt-4 justify-between gap-5 py-5 pl-5 w-[300px] pr-1 transition-all  rounded-full h-[50px]  ${
                    idx === activeIndex
                      ? "bg-[#F5F5F5] border "
                      : "dark:text-white"
                  }`}
                >
                  <div className="flex items-center cursor-pointer gap-5">
                    <motion.div {...framerIcon}>
                      <Icon className="text-2xl" />
                    </motion.div>
                    <motion.span {...framerText(idx)}>{title}</motion.span>
                  </div>

                  <div className="h-10 w-10 rounded-full border  flex items-center justify-center">
                    <RiArrowRightSLine className="text-lg" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>
      {/* //   </motion.div> */}
    </AnimatePresence>
  );
};

export default ChatBody;

ChatBody.propTypes = {
  activeIndex: Proptypes.number.isRequired,
  handleClick: Proptypes.func.isRequired,
  setOpen: Proptypes.bool.isRequired,
};
