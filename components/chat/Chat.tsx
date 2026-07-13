"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/types/chat";
import { Bot, SendHorizonal, Sparkles } from "lucide-react";
import { useState } from "react";

interface ChatProps {
  enabled: boolean;
}

export default function Chat({ enabled }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const sendMessage = () => {
    if (!input.trim() || loading || !enabled) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "This is a demo AI response.",
      };

      setMessages((prev) => [...prev, aiMessage]);

      setLoading(false);
    }, 1000);
  };
  return (
    <div className="flex h-[650px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Bot size={20} className="text-white" />
          </div>

          <div>
            <h2 className="font-semibold text-white">AI Language Tutor</h2>

            <p className="text-sm text-zinc-400">Learn through conversation</p>
          </div>
        </div>

        <Sparkles className="text-yellow-400" size={18} />
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 items-center justify-center bg-zinc-950 px-10">
        <div className="max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">
            <Bot size={42} className="text-blue-400" />
          </div>

          {enabled ? (
            <>
              <h2 className="mb-4 text-3xl font-bold">You're Ready 🚀</h2>

              <p className="text-lg leading-8 text-zinc-400">
                Start chatting in any language.
                <br />
                I'll understand your message and help you learn naturally.
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-4 text-3xl font-bold">Welcome 👋</h2>

              <p className="text-lg leading-8 text-zinc-400">
                Select your native language and the language you want to learn.
                <br />
                Your AI tutor will then guide every conversation.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 bg-zinc-900 p-5">
        <div className="flex items-end gap-3">
          <Textarea
            disabled={!enabled}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              enabled ? "Ask me anything..." : "Select both languages first..."
            }
            rows={2}
            className="
    resize-none
    rounded-xl
    border-zinc-700
    bg-zinc-950
    text-white
    placeholder:text-zinc-500
    focus-visible:ring-blue-500
  "
          />

          <Button
            disabled={!enabled}
            size="icon"
            className="
              h-12
              w-12
              rounded-xl
              bg-blue-600
              hover:bg-blue-500
            "
          >
            <SendHorizonal size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
