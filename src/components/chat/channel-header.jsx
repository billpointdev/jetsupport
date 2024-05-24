import { TypingIndicator, useChannelStateContext } from "stream-chat-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PiDotsThreeOutline } from "react-icons/pi";
import { useEffect, useState } from "react";
import Proptypes from "prop-types";

export const CustomChannelHeader = ({ title }) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const { channel, setActiveChannel } = useChannelStateContext();

  useEffect(() => {
    if (channel.data.type == "team") {
      setName(channel?.data?.name);
      setImage(channel?.data?.image);
    } else {
      setName(channel?.data?.created_by?.name);
      setImage(channel?.data?.created_by?.image);
    }
  }, [channel]);

  const handleClick = () => {
    setActiveChannel?.(null);
    const chatDisplay = document.querySelector("#channel");
    const chatList = document.querySelector("#chatlist");
    const navbar = document.querySelector("#navbar");
    if (window.innerWidth <= 768) {
      chatDisplay.classList.add("open");
      chatList.classList.remove("open");
      navbar.classList.remove("open");
    }
  };

  return (
    <div className="str-chat__header-livestream lg:px-4 justify-between py-1 border- flex items-center">
      <div className="flex items-center">
        <div
          onClick={handleClick}
          className="h-8 w-8 rounded-full border lg:hidden  flex items-center justify-center"
        >
          <MdOutlineKeyboardArrowLeft className="text-sm text-gray-700" />
        </div>
        <div className="ml-2">
          <div className="flex items-center ">
            <div className=" w-10 h-10 rounded-full overflow-hidden">
              <img
                src={image}
                alt="image"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="ml-2">{title || name}</p>
          </div>
          <TypingIndicator />
        </div>
      </div>

      <div className="h-8 w-8 rounded-full flex items-center justify-center border">
        <PiDotsThreeOutline className=" text-gray-700" />
      </div>
    </div>
  );
};

CustomChannelHeader.propTypes = {
  title: Proptypes.string,
  name: Proptypes.string,
  image: Proptypes.string,
};
