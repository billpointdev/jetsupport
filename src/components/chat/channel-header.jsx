/* eslint-disable no-unused-vars */
import { TypingIndicator, useChannelStateContext } from "stream-chat-react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PiDotsThreeOutline } from "react-icons/pi";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";

export const CustomChannelHeader = () => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [object, setObject] = useState({});
  const { channel, setActiveChannel } = useChannelStateContext();

  useEffect(() => {
    if (channel) {
      setName(channel.data.name);
      setImage(channel.data.image);

      const currentUserID = channel._client.userID;
      const members = channel.state.members;
      const userIDs = Object.keys(members);

      if (userIDs.includes(currentUserID)) {
        const otherUserInfo = userIDs
          .filter(userID => userID !== currentUserID)
          .map(userID => members[userID]);

        if (otherUserInfo.length > 0) {
          setUserInfo(otherUserInfo[0]);
        }
      }

      const creatorUserId = channel.data.created_by?.id;
      const channelMembers = channel.state.members;

      Object.keys(channelMembers).forEach(memberId => {
        const member = channelMembers[memberId];
        if (member.user_id !== creatorUserId) {
          const yourObject = {
            userId: member.user_id,
            name: member.user?.name,
            role: member.channel_role,
            image: member.user?.image,
          };

          setObject(yourObject);
        }
      });
    }
  }, [channel]);

  const handleClick = () => {
    setActiveChannel?.(null);
    const chatDisplay = document.querySelector("#channel");
    const chatList = document.querySelector("#chatlist");
    const navbar = document.querySelector("#navbar");
    if (window.innerWidth <= 425) {
      chatDisplay.classList.add("open");
      chatList.classList.remove("open");
      navbar.classList.remove("open");
    }
  };


  return (
    <div className="str-chat__header-livestream px-2 py-2 lg:px-4 justify-between border- flex items-center">
      <div className="flex items-center">
        <button
          onClick={handleClick}
          className="h-8 w-8 rounded-full border lg:hidden flex items-center justify-center"
        >
          <MdOutlineKeyboardArrowLeft className="text-sm text-gray-700" />
        </button>
        <div className="ml-2">
          <div className="flex items-center ">
          <div className="w-10 h-10 flex rounded-full border-2 border-gray-300  items-center justify-center overflow-hidden">
                {userInfo?.user?.image ? (
                  <img
                    src={userInfo?.user?.image}
                    alt="avatar"
                    className="w-full h-full object-cover" // Ensure the image covers the div area
                  />
                ) : (
                  <FaUser className="text-gray-300  w-full h-full" /> // Center icon if no image
                )}
              </div>
            <p className="ml-2 capitalize">{userInfo?.user?.name ?? "N/A"}</p>
          </div>
          <TypingIndicator />
        </div>
      </div>

      <div className="h-8 w-8 rounded-full flex items-center justify-center border">
        <PiDotsThreeOutline className="text-gray-700" />
      </div>
    </div>
  );
};

