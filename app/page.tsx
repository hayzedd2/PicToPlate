"use client";
import { useChat } from "ai/react";
import ChatContainer from "./customComponents/ChatContainer";
import InputContainer from "./customComponents/InputContainer";
import EmptyMessageState from "./customComponents/EmptyMessageState";
import Navbar from "./customComponents/Navbar";
import AfterMessageActions from "./customComponents/AfterMessageActions";
export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  return (
    <main className="min-h-[100dvh] relative px-3 flex flex-col">
      <Navbar />
      <section
        className={` ${
          messages.length == 0 ? "justify-center flex-col" : ""
        } max-w-none md:max-w-[40rem] w-full flex flex-1 mx-auto`}
      >
        {messages.length == 0 && (
          <EmptyMessageState
            input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        )}
        {/* <AfterMessageActions text="Hello love" /> */}
        <ChatContainer
          isLoading={isLoading}
          messages={messages}
          error={error}
        />
        <InputContainer
          input={input}
          messages={messages}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
}
