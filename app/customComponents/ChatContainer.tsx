"use client";
import { Message, useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";
import { generateGradient } from "@/helpers/generateGradient";
import TextHighlighter from "./TextHighlighter";
import ChatError from "./ChatError";
import Modal from "./Modal";
import { useModalStore } from "@/lib/hooks/useModalStore";
import AfterMessageActions from "./AfterMessageActions";

interface ChatProps {
  messages: Message[];
  isLoading: boolean;
  error: Error | undefined;
}
const ChatContainer = ({ messages, isLoading, error }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const OpenModal = useModalStore((state) => state.openModal);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  console.log(messages)
  return (
    <div className="w-full flex flex-col mb-24 md:px-0 gap-4 ">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex w-full ${
            m.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div className={`max-w-[500px] flex flex-col gap-2`}>
            <div className="flex gap-2 w-full  items-start">
              {m.role == "assistant" && (
                <div
                  style={{
                    background: generateGradient(8),
                  }}
                  className="w-7 h-7 shrink-0 rounded-full"
                ></div>
              )}

              <div className="flex flex-col">
                <div>
                  {m?.experimental_attachments
                    ?.filter((attachment) =>
                      attachment?.contentType?.startsWith("image/")
                    )
                    .map((attachment, index) => (
                      <div key={`${m.id}-${index}`}>
                        <button
                          onClick={() => {
                            setSelectedImage(attachment.url);
                            OpenModal();
                          }}
                          className="w-full flex gap-2 items-end justify-end rounded-md p-1 "
                        >
                          <img
                            src={attachment.url}
                            className="bx-shadow-light w-[40px] rounded-sm bx-shadow-light  h-[40px] object-cover"
                            alt={attachment.name ?? `attachment-${index}`}
                          />
                        </button>
                      </div>
                    ))}
                </div>
                <div
                  className={`whitespace-pre-wrap relative text-[16px] leading-2  ${
                    m.role === "user"
                      ? "bg-[#f3f3f3] py-2  rounded-[20px] px-4 "
                      : "text-black selectable-text"
                  }`}
                >
                  {m.role == "assistant" && <TextHighlighter />}
                  {m.content}
                </div>
                {m.role == "assistant" && !isLoading && (
                  <AfterMessageActions text={m.content} />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <Modal>
        <img
          src={selectedImage}
          className="w-[20rem] bx-shadow rounded-[20px] h-[18rem]  object-cover"
          alt=""
        />
      </Modal>
      {isLoading ? <Loading /> : null}
      {error ? <ChatError /> : null}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
