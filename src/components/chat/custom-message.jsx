import {
  Avatar,
  MessageText,
  useMessageContext,
} from "stream-chat-react";

export const CustomMessageUi = () => {
  const { isMyMessage, message } = useMessageContext();

  const messageUiClassNames = ["custom-message-ui"];

  if (isMyMessage()) {
    messageUiClassNames.push("custom-message-ui--mine");
  } else {
    messageUiClassNames.push("custom-message-ui--other");
  }

  return (
    <div className={messageUiClassNames.join(" ")} data-message-id={message.id}>
      <Avatar
        image={message.user?.image}
        name={message.user?.name || message.user?.id}
      />
      <MessageText />
    </div>
  );
};
