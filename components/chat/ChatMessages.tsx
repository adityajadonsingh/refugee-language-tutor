import { RefObject } from "react";

import { Bot } from "lucide-react";

import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";

interface ChatMessagesProps {
  enabled: boolean;
  messages: Message[];
  loading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({
  enabled,
  messages,
  loading,
  messagesEndRef,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6">
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">
              <Bot
                size={42}
                className="text-blue-400"
              />
            </div>

            <h2 className="mb-4 text-3xl font-bold">
              {enabled ? "You're Ready 🚀" : "Welcome 👋"}
            </h2>

            <p className="text-lg leading-8 text-zinc-400">
              {enabled
                ? "Start chatting in any language. I'll help you learn naturally."
                : "Select your native language and the language you want to learn."}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))}

          {loading && (
            <div className="flex items-end gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <Bot
                  size={18}
                  className="text-white"
                />
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
                <div className="h-2 w-2 animate-bounce rounded-full bg-white" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:150ms]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}