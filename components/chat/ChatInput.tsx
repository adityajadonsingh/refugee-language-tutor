"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";

interface ChatInputProps {
  enabled: boolean;
  loading: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
}

export default function ChatInput({
  enabled,
  loading,
  input,
  setInput,
  sendMessage,
}: ChatInputProps) {
  return (
    <div className="border-t border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-end gap-3">
        <Textarea
          disabled={!enabled || loading}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            enabled
              ? "Type your message..."
              : "Select both languages first..."
          }
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
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
          onClick={sendMessage}
          disabled={!enabled || loading}
          size="icon"
          className="h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-500"
        >
          <SendHorizonal size={18} />
        </Button>
      </div>
    </div>
  );
}