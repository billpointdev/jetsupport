import { useEffect, useRef } from "react";
import { framerIcon, framerSidebarPanel, framerText, items } from "../../utils";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";

const ChatBody = ({ handleClick, setOpen, activeIndex,open }) => {
  const dragControls = useDragControls(); // Hook for controlling drag gestures
  const ref = useRef();

  useEffect(() => {
    // Enable swipe functionality when the component mounts
    if (!open) {
      dragControls.start({ x: 0 }); // Reset the position when component mounts and open is false
    }
  }, [open, dragControls]);

  const handleSwipe = (event, info) => {
    if (info.velocity.x > 500) {
      // Swiping to the right
      setOpen(true);
    } else if (info.velocity.x < -500) {
      // Swiping to the left
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="sidebar"
          {...framerSidebarPanel}
          className={`fixed left-0 top-0 flex z-10 flex-col w-full  justify-between overflow-y-auto h-screen pt-[66px] max-w-xs border-r border-lightGray dark:bg-gray-800 bg-white`}
          ref={ref}
          aria-label="Sidebar"
          drag="x" // Allow dragging only along the X-axis
          dragConstraints={{ left: 0, right: 0 }} // Constrain dragging within the container
          dragElastic={0} // Disable elastic dragging
          dragControls={dragControls} // Assign drag controls
          onDragEnd={handleSwipe} // Handle swipe gesture
        >
          <ul>
            {items.map((item, idx) => {
              const { title, href, Icon } = item;
              return (
                <li key={title}>
                  <Link
                    onClick={() => handleClick(idx, title)}
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
      )}
    </AnimatePresence>
  );
};

export default ChatBody;

ChatBody.propTypes = {
  activeIndex: Proptypes.number.isRequired,
  handleClick: Proptypes.func.isRequired,
  setOpen: Proptypes.func.isRequired,
  open:Proptypes.bool
};
