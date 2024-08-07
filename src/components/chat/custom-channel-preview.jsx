import PropTypes from "prop-types";
import { useTranslationContext } from "stream-chat-react";
import { useEffect, useMemo, useState } from "react";
import { truncateText } from "../../utils/text";
import { FaUser } from "react-icons/fa";

export const CustomChannelPreview = (props) => {
  const { channel, setActiveChannel, activeChannel, latestMessage, unread } =
    props;

  const [userInfo, setUserInfo] = useState({});

  const isSelected = channel.id === activeChannel?.id;
  const latestMessageAt = channel.state.last_message_at;
  const { userLanguage } = useTranslationContext();

  // Memoized timestamp formatting
  const timestamp = useMemo(() => {
    if (!latestMessageAt) return "";
    const formatter = new Intl.DateTimeFormat(userLanguage, {
      timeStyle: "short",
    });
    return formatter.format(latestMessageAt);
  }, [latestMessageAt, userLanguage]);

  const handleClick = () => {
    setActiveChannel?.(channel);
    const chatDisplay = document.querySelector("#channel");
    const chatList = document.querySelector("#chatlist");
    const navbar = document.querySelector("#navbar");
    if (window.innerWidth <= 768) {
      chatDisplay.classList.remove("open");
      chatList.classList.add("open");
      navbar.classList.add("open");
    }
  };

  useEffect(() => {
    if (channel) {
      const currentUserID = channel._client.userID;
      const members = channel.state.members;
      const userIDs = Object.keys(members);

      if (userIDs.includes(currentUserID)) {
        const otherUserInfo = userIDs
          .filter((userID) => userID !== currentUserID)
          .map((userID) => members[userID]);

        if (otherUserInfo.length > 0) {
          setUserInfo(otherUserInfo[0]);
        }
      }
    }
  }, [channel]);

  // Determine message text
  const getMessageText = () => {
    if (channel?.isTyping) return "typing";
    if (latestMessage === "Nothing yet...") return latestMessage;
    return latestMessage?.props?.children !== undefined
      ? truncateText(latestMessage?.props?.children, 26)
      : latestMessage;
  };

  return (
    <div
      onClick={handleClick}
      style={{ margin: "", display: "flex", gap: "5px" }}
      className={`items-center mt-4 mx-1 px-2 rounded-md py-2 overflow-y-auto bg-[#fff] cursor-pointer ${
        isSelected ? "border-2 border-primary" : "hover:bg-primarylight"
      }`}
    >
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
      <div style={{ flex: 1 }}>
        <div className="flex justify-between">
          {truncateText(userInfo?.user?.name ?? "Unnamed Channel", 20)}
          <time
            dateTime={latestMessageAt?.toISOString()}
            className="text-[#858688] text-xs"
          >
            {timestamp}
          </time>
        </div>
        {latestMessage && (
          <div
            className="text-[#616161] text-sm flex justify-between"
            style={{ fontSize: "14px" }}
          >
            <p className="truncate w-[170px]">{getMessageText()}</p>
            {unread > 0 && (
              <p className="w-5 text-xs h-5 bg-[#06C270] text-white rounded-full flex items-center justify-center">
                {unread}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

CustomChannelPreview.propTypes = {
  channel: PropTypes.object,
  setActiveChannel: PropTypes.func,
  activeChannel: PropTypes.object,
  latestMessage: PropTypes.any,
  unread: PropTypes.number,
};
