import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import JetSupportLogo from "../../../utils/JetSupportLogo";
import { NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { title: "Home", url: "/" },
  { title: "About", url: "#" },
  { title: "Services", url: "#" },
  { title: "Contact", url: "#" },
];

const iconList = [
  {
    title: "Login",
    url: "/login",
  },
  {
    title: "Signup",
    url: "/signup",
  },
];

const links = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "About",
    url: "#",
  },
  {
    title: "Services",
    url: "#",
  },
  {
    title: "Contact",
    url: "#",
  },
];
function Navbar() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const modalVariants = {
    hidden: {
      y: "-100vh",
    },
    visible: {
      y: 0,
      transition: {
        type: "tween", // Set transition type to 'tween'
        duration: 0.3, // Specify duration
      },
    },
    exit: {
      y: "-100vh",
      transition: {
        type: "tween",
        duration: 0.3,
        delay: 0.3,
      },
    },
  };

  const linkItemVariants = {
    hidden: { opacity: 0, y: "50%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", // Add ease-out easing function
      },
    },
    exit: {
      opacity: 0,
      y: "50%",
      transition: {
        duration: 0.1,
        ease: "easeOut", // Add ease-out easing function
      },
    },
  };

  const navLinksVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navigate = useNavigate();
  return (
    <>
      <nav className=" py-4 px-4">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="text-white font-bold text-xl">
            {" "}
            <JetSupportLogo />
          </div>
          <div className="flex items-center gap-4">
            <div className="lg:flex sm:gap-4 hidden ">
              {links.map((link) => (
                <NavLink
                  key={link.title}
                  className={`block rounded-md px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-white ${
                    location.pathname === link.url
                      ? "bg-primary text-white"
                      : ""
                  }`}
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </div>
          <ul className="flex text-white gap-6 items-center cursor-pointer">
            {iconList.map((item, index) => (
              <div
                key={index}
                className="hidden md:block rounded-md bg-white px-5 py-2.5 text-sm font-medium border border-primary text-primary hover:text-white transition hover:bg-primary"
                onClick={() => navigate(`${item.url}`)}
              >
                {item.title}
              </div>
            ))}
            <FaBars
              className=" block text-[#000] lg:hidden"
              onClick={toggleModal}
            />
          </ul>
        </div>
      </nav>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-10 flex justify-center items-center bg-primary"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <FaTimes
              className="absolute top-6 right-4 text-white cursor-pointer"
              onClick={toggleModal}
              style={{ fontSize: "16px" }}
            />
            <motion.div
              className="relative bg-primary w-full"
              variants={navLinksVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col gap-8 items-center justify-center h-full ">
                {navLinks.map((link, index) => (
                  <motion.span
                    key={index}
                    className="text-white font-light text-2xl cursor-pointer"
                    variants={linkItemVariants}
                  >
                    {link.title}
                  </motion.span>
                ))}
              </div>
              <div className="px-4">
                <motion.div
                  variants={linkItemVariants}
                  className="  rounded-md bg-white text-center mt-5 px-5 py-2.5 text-sm font-medium border border-primary text-primary hover:border-white hover:text-white transition hover:bg-primary"
                  onClick={() => navigate(`/login`)}
                >
                  Login
                </motion.div>
                <motion.div
                  variants={linkItemVariants}
                  className="  rounded-md bg-white text-center mt-5 px-5 py-2.5 text-sm font-medium border border-primary text-primary  hover:border-white hover:text-white transition hover:bg-primary"
                  onClick={() => navigate(`/signup`)}
                >
                  Signup{" "}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
