import Proptypes from "prop-types";
import { getInitials } from "../../utils";
import { useTranslationContext } from "stream-chat-react";
import { useEffect, useMemo } from "react";

export const CustomChannelPreview = (props) => {
  const {
    channel,
    setActiveChannel,
    activeChannel,
    latestMessage,
    displayTitle,
    displayImage,
    unread,
  } = props;

  // console.log("props ==>" , props)
  const isSelected = channel.id === activeChannel?.id;
  const latestMessageAt = channel.state.last_message_at;

  const { userLanguage } = useTranslationContext();

  const timestamp = useMemo(() => {
    if (!latestMessageAt) {
      return "";
    }
    const formatter = new Intl.DateTimeFormat(userLanguage, {
      timeStyle: "short",
    });
    return formatter.format(latestMessageAt);
  }, [latestMessageAt, userLanguage]);

  const channelColorsMap = {};

  function getRandomColor() {
    const colors = ["#CCDFF7", "#FCD3B3"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function getChannelColor(channelName) {
    if (channelColorsMap[channelName]) {
      return channelColorsMap[channelName];
    } else {
      const color = getRandomColor();
      channelColorsMap[channelName] = color;
      return color;
    }
  }

  const channelName = channel.data?.name
    ? channel.data?.name
    : "Unnamed Channel";
  const channelColor = getChannelColor(channelName);

  const handleClick = () => {
    setActiveChannel?.(channel);
    const chatDisplay = document.querySelector("#channel");
    const chatList = document.querySelector("#chatlist");

    const navbar = document.querySelector("#navbar");
    //  if (chatDisplay) {
    if (window.innerWidth <= 768) {
      chatDisplay.classList.remove("open");
      chatList.classList.add("open");
      navbar.classList.add("open");
    }
  };

  useEffect( () =>
  {
    
    console.log("istYPING" , channel?.isTyping)
  },[channel?.isTyping])
  return (
    <>
      <div
        onClick={handleClick}
        style={{ margin: "", display: "flex", gap: "5px" }}
        className={`items-center mt-4 mx-1 px-2 rounded-md py-2 overflow-y-auto bg-[#fff] cursor-pointer ${
          isSelected ? "border-2 border-primary" : " hover:bg-primarylight "
        } `}
      >
        {displayImage ? (
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <img
              src={displayImage}
              alt="channel-image"
              className="w-full h-full object-fit"
            />
          </div>
        ) : (
          <div
            className={`w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center`}
            style={{ backgroundColor: channelColor }}
          >
            {getInitials(displayTitle ? displayTitle : "Unnamed Channel")}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div className="flex justify-between">
            {displayTitle || "Unnamed Channel"}
            <time
              dateTime={latestMessageAt?.toISOString()}
              className="text-[#858688] text-xs"
            >
              {timestamp}
            </time>
          </div>
          {latestMessage && (
            <div
              className="text-[#616161] text-sm flex justify-between "
              style={{ fontSize: "14px" }}
            >
              {channel?.isTyping ? `typing` : latestMessage}
              {unread > 0 && (
                <p className="w-5 text-xs h-5 bg-[#06C270] text-white rounded-full flex items-center justify-center">
                  {unread}
                </p>
              )}{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

CustomChannelPreview.propTypes = {
  channel: Proptypes.object,
  setActiveChannel: Proptypes.func,
  activeChannel: Proptypes.object,
  latestMessage: Proptypes.object,
  displayTitle: Proptypes.string,
  displayImage: Proptypes.string,
  unread: Proptypes.number,
};
