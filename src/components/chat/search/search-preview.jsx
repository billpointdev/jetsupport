import Proptypes from "prop-types";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MessageList, useChatContext } from "stream-chat-react";
import { getChannelColor, getInitials } from "../../../utils";

const ChannelSearchResultPreview = ({ channel }) => {
  const { setActiveChannel } = useChatContext();
  const channelName = channel?.name ? channel?.name : "Unnamed Channel";
  const channelColor = getChannelColor(channelName);

  return (
    // <li
    //   className="search-results__item"
    //   onClick={() => setActiveChannel(channel)}
    // >
    //   <div className="search-results__icon">#️⃣</div>
    //   {channel.data?.name}
    //   </li>
    <>
      <li
        onClick={() => setActiveChannel(channel)}
        style={{ margin: "", display: "flex", gap: "5px" }}
        className={`items-center mt-4 px-1  rounded-md py-2 overflow-y-auto hover:bg-primarylight bg-[#fff] cursor-pointer `}
      >
        {/* <div className="search-results__icon">👤</div> */}
        {!channel?.image ? (
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <img
              src={channel?.image}
              alt="channel-image"
              className="w-full h-full object-fit"
            />
          </div>
        ) : (
          <div
            className={`w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center`}
            style={{ backgroundColor: channelColor }}
          >
            {getInitials(channel?.name ? channel?.name : "Unnamed Channel")}
          </div>
        )}
        <p className="capitalize">{channel.name ?? channel.id}</p>
      </li>
      {/* {channel.length !== 0 ? (
        <li
          className="search-results__item"
          onClick={() => setActiveChannel(channel)}
        >
          <div className="search-results__icon">#️⃣</div>
          {channel.data?.name}
        </li>
      ) : (
        <p className="text-gray-700">No results</p>
      )}
      <p>class</p> */}
    </>
  );
};

ChannelSearchResultPreview.propTypes = {
  channel: Proptypes.object,
};
const UserSearchResultPreview = ({ user }) => {
  const { client, setActiveChannel } = useChatContext();

  //   const handleClick = async () => {
  //     const channel = client.channel("messaging", {
  //       members: ["userId", user.id],
  //     });
  //     await channel.watch();
  //     setActiveChannel(channel);
  //   };
  const handleClick = async () => {
    try {
      const currentUser = client.userID; // assuming client is already connected with a user ID
      const users = [currentUser, user.id];

      for (const userId of users) {
        await client.upsertUser({ id: userId });
      }

      const channelId = `dm_${currentUser}_${user.id}`;
      const channel = client.channel("messaging", channelId, {
        members: [currentUser, user.id],
      });

      await channel.watch();
      setActiveChannel(channel);
    } catch (error) {
      console.error("Error creating or watching channel:", error);
    }
  };

  const channelName = user?.name ? user?.name : "Unnamed Channel";
  const channelColor = getChannelColor(channelName);

  return (
    <>
      <li
        onClick={handleClick}
        style={{ margin: "", display: "flex", gap: "5px" }}
        className={`items-center mt-4 px-1  rounded-md py-2 overflow-y-auto hover:bg-primarylight bg-[#fff] cursor-pointer `}
      >
        {/* <div className="search-results__icon">👤</div> */}
        {!user?.image ? (
          <div className="w-10 h-10 rounded-full overflow-hidden border">
            <img
              src={user?.image}
              alt="channel-image"
              className="w-full h-full object-fit"
            />
          </div>
        ) : (
          <div
            className={`w-10 h-10 rounded-full overflow-hidden border flex items-center justify-center`}
            style={{ backgroundColor: channelColor }}
          >
            {getInitials(user?.name ? user?.name : "Unnamed Channel")}
          </div>
        )}
        <p className="capitalize">{user?.name ?? user?.id}</p>
      </li>
    </>
  );
};

UserSearchResultPreview.propTypes = {
  user: Proptypes.object,
};

const MessageSearchResultPreview = ({ message }) => {
  const navigate = useNavigate(); // bring your own router of choice
  const { client, setActiveChannel } = useChatContext();
  const location = useLocation();
  const messageId = useMemo(() => new URL(location).hash.slice(1), [location]);

  const handleClick = async () => {
    if (message.channel) {
      const channel = client.channel(message.channel.type, message.channel.id);
      setActiveChannel(channel);
      await channel.state.loadMessageIntoState(message.id);
      navigate.replace(`${window.location.pathname}#${message.id}`);
    }
  };

  return (
    <>
      <li className="search-results__item" onClick={handleClick}>
        <div className="search-results__icon">💬</div>
        {message.text}
      </li>
      <MessageList highlightedMessageId={messageId} />;
    </>
  );
};

MessageSearchResultPreview.propTypes = {
  message: Proptypes.object,
};

export const SearchResultsPreview = ({ results }) => {
  if (results.items.length === 0) {
    return <div className="search-results">🤷‍♂️ No results</div>;
  }

  return (
    <ul className="search-results">
      {results.entity === "channel" &&
        results.items.map((item) => (
          <ChannelSearchResultPreview key={item.cid} channel={item} />
        ))}
      {results.entity === "user" &&
        results.items.map((item) => (
          <UserSearchResultPreview key={item.id} user={item} />
        ))}
      {results.entity === "message" &&
        results.items.map((item) => (
          <MessageSearchResultPreview key={item.id} message={item} />
        ))}
    </ul>
  );
};

SearchResultsPreview.propTypes = {
  results: Proptypes.object,
};

export const AllSearchResultsPreview = ({ results }) => {
  if (!results || Object.keys(results).length === 0) {
    return <div className="search-results">No results</div>;
  }
  return (
    <div className="search-results flex flex-col gap-8">
      {Object.entries(results).map(([entity, items]) => {
        if (items.length === 0) {
          console.log("No items for entity:", entity);
          return; // or you can render a message indicating no items
        }
        return (
          <div key={entity}>
            <h2 className="uppercase text-lightGray border-b">{entity}</h2>
            <ul>
              {items.map((item) => {
                switch (entity) {
                  case "channels":
                    return (
                      <ChannelSearchResultPreview
                        key={item.id}
                        channel={item}
                      />
                    );
                  case "users":
                    return (
                      <UserSearchResultPreview key={item.id} user={item} />
                    );
                  case "messages":
                    return (
                      <MessageSearchResultPreview
                        key={item.id}
                        message={item}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

AllSearchResultsPreview.propTypes = {
  results: Proptypes.object.isRequired,
};
