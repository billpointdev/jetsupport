import PropTypes from "prop-types";
import { getInitials } from "../../utils";
import { useTranslationContext } from "stream-chat-react";
import { useEffect, useMemo, useState } from "react";

export const CustomChannelPreview = (props) => {
  const {
    channel,
    setActiveChannel,
    activeChannel,
    latestMessage,
    unread,
  } = props;

  console.log("channel ==>", props);
  const [userInfo, setUserInfo] = useState({});

  const isSelected = channel.id === activeChannel?.id;
  const latestMessageAt = channel.state.last_message_at;
  const { userLanguage } = useTranslationContext();

  // Memoized timestamp formatting
  const timestamp = useMemo(() => {
    if (!latestMessageAt) return "";
    const formatter = new Intl.DateTimeFormat(userLanguage, { timeStyle: "short" });
    return formatter.format(latestMessageAt);
  }, [latestMessageAt, userLanguage]);

  // Color management for channels
  const channelColorsMap = {};

  const getRandomColor = () => {
    const colors = ["#CCDFF7", "#FCD3B3"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getChannelColor = (channelName) => {
    if (!channelColorsMap[channelName]) {
      channelColorsMap[channelName] = getRandomColor();
    }
    return channelColorsMap[channelName];
  };

  const channelName = channel.data?.name || "Unnamed Channel";
  const channelColor = getChannelColor(channelName);

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
          .filter(userID => userID !== currentUserID)
          .map(userID => members[userID]);

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
      ? `${latestMessage?.props?.children}...`
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
      {userInfo?.user?.image ? (
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <img
            src={userInfo?.user?.image ?? ""}
            alt="channel_image"
            className="w-full h-full object-fit"
          />
        </div>
      ) : (
        <div
          className={`w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center`}
          style={{ backgroundColor: channelColor }}
        >
          {getInitials(userInfo?.user?.name || "Unnamed Channel")}
        </div>
      )}
      <div style={{ flex: 1 }}>
        <div className="flex justify-between">
          {userInfo?.user?.name || "Unnamed Channel"}
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
