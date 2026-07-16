"use client";

import { useState } from "react";
import { Language } from "@/types/language";
import Chat from "@/components/chat/Chat";
import LanguageSelector from "@/components/language/LanguageSelector";

export default function Home() {
  const [nativeLanguage, setNativeLanguage] = useState<Language | null>(null);
  const [learningLanguage, setLearningLanguage] = useState<Language | null>(
    null,
  );

  const isChatEnabled = nativeLanguage !== null && learningLanguage !== null;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-6 md:px-6">
        {/* Header */}

        <header className="mb-6 text-center">
          <h1 className="text-xl font-bold md:text-3xl">
            🌍 AI Language Tutor
          </h1>

          <p className="mt-2 text-sm text-zinc-400 md:text-base">
            Helping refugees communicate confidently through AI.
          </p>
        </header>

        {/* Language Toolbar */}

        <section className="mb-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <LanguageSelector
              label="🌍 Your Language"
              value={nativeLanguage}
              onChange={setNativeLanguage}
              exclude={learningLanguage?.code}
            />

            <LanguageSelector
              label="📚 Language to Learn"
              value={learningLanguage}
              onChange={setLearningLanguage}
              exclude={nativeLanguage?.code}
            />
          </div>
        </section>

        {/* Chat */}

        <div className="flex-1">
          <Chat
            enabled={isChatEnabled}
            nativeLanguage={nativeLanguage}
            learningLanguage={learningLanguage}
          />
        </div>
      </div>
    </main>
  );
}
