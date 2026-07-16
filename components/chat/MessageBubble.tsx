import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
          <Bot size={18} className="text-white" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-7 shadow-md ${
          isUser
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md border border-zinc-800 bg-zinc-900 text-zinc-100"
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <div
  className="
    prose
    prose-invert
    max-w-none

    prose-headings:mb-2
    prose-headings:mt-4
    prose-headings:text-white

    prose-p:my-2
    prose-p:text-zinc-200

    prose-strong:text-white

    prose-ul:my-2
    prose-li:my-1

    prose-code:text-sky-400

    prose-pre:bg-zinc-950
    prose-pre:border
    prose-pre:border-zinc-800

    prose-hr:border-zinc-700
  "
>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {message.content}
  </ReactMarkdown>
</div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
          <User size={18} className="text-white" />
        </div>
      )}
    </div>
  );
}
