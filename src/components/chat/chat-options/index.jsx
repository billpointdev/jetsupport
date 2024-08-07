import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";
import { Chat, useCreateChatClient } from "stream-chat-react";
import LoadingIcon from "../../../assets/loading-icon.gif";

const apiKey = import.meta.env.VITE_API_KEY;

const ChatWithOptions = ({ timeout, children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.user?.chat_id;
  const token = userInfo?.chat_token;

  const filters = useMemo(
    () => ({ members: { $in: [userId] }, type: "messaging" }),
    [userId]
  );
  const options = useMemo(() => ({ presence: true, state: true }), []);
  const sort = useMemo(() => ({ last_message_at: -1 }), []);

  const client = useCreateChatClient({
    apiKey,
    options: { timeout },
    tokenOrProvider: token,
    userData: { id: userId },
  });

  useEffect(() => {
    const initializeClient = async () => {
      if (client) {
        try {
          await client.connectUser({ id: userId }, token);
          await client.queryChannels(filters, sort, options);
        } catch (error) {
          console.error("Error initializing chat client:", error);
        }
      }
    };

    initializeClient();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [client, userId, token, filters, options, sort]);

  if (!client)
    return (
      <div className="flex flex-col justify-center place-items-center h-[100vh]">
        {" "}
        <img src={LoadingIcon} alt="Loading" />{" "}
      </div>
    );
  return <Chat client={client}>{children}</Chat>;
};

// Prop Types Validation
ChatWithOptions.propTypes = {
  timeout: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default ChatWithOptions;
