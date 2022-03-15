import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { addMessageMutation, messagesQuery } from "./graphql/queries";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function Chat({ user }) {
  const { data } = useQuery(messagesQuery);
  const [addMessage] = useMutation(addMessageMutation);
  const messages = data ? data.messages : [];

  const handleSend = async (text) => {
    await addMessage({ variables: { input: { text } } });
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;
