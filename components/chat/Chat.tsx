"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Sparkles } from "lucide-react";

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

import { Message } from "@/types/chat";

import { Language } from "@/types/language";

interface ChatProps {
  enabled: boolean;
  nativeLanguage: Language | null;
  learningLanguage: Language | null;
}

export default function Chat({
  enabled,
  nativeLanguage,
  learningLanguage,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading || !enabled) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    if (!nativeLanguage || !learningLanguage) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nativeLanguage,
          learningLanguage,
          message: userMessage.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message.content,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[650px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-2">
            <Bot size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-white">AI Language Tutor</h2>

            <p className="text-sm text-zinc-400">Learn through conversation</p>
          </div>
        </div>

        <Sparkles className="text-yellow-400" size={18} />
      </div>

      <ChatMessages
        enabled={enabled}
        messages={messages}
        loading={loading}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput
        enabled={enabled}
        loading={loading}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}
