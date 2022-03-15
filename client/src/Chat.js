import React from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import {
  addMessageMutation,
  messageAddedSubscription,
  messagesQuery,
} from "./graphql/queries";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function useChatMessages() {
  const { data } = useQuery(messagesQuery);
  const [addMessage] = useMutation(addMessageMutation);
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      });
    },
  });
  const messages = data ? data.messages : [];
  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
}

function Chat({ user }) {
  const { messages, addMessage } = useChatMessages();

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={addMessage} />
      </div>
    </section>
  );
}

export default Chat;
