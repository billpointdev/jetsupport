import { FaInstagram } from "react-icons/fa6";
import { FaDribbble } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

export const socialLinks = [
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/jetpay_official/",
  },
  {
    icon: <FaDribbble />,
    link: "https://www.dribbble.com/jetpay",
  },
  {
    icon: <FaTwitter />,
    link: "https://www.twitter.com/jetpay_official",
  },
  {
    icon: <FaYoutube />,
    link: "#",
  },
];


export const USER1 = {
  name: 'Nathan-Trust',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  id:"nathan1323jfsdlj"
}

export const USER2 = {
  name: 'Dee vyne',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  id:"jkjkafj12301j"
}

export const USER3 = {
  name: 'Crystal',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  id:"nak23487j"
}

export const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

export const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

export const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.5 + delay / 10,
    },
  };
};

export const framerIcon = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
    delay: 1.5,
  },
};


export function getInitials(name) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
}

const channelColorsMap = {};

  export function getRandomColor() {
    const colors = ["#CCDFF7", "#FCD3B3"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  export function getChannelColor(channelName) {
    if (channelColorsMap[channelName]) {
      return channelColorsMap[channelName];
    } else {
      const color = getRandomColor();
      channelColorsMap[channelName] = color;
      return color;
    }
  }