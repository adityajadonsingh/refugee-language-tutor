"use client";

import { useState } from "react";

import Chat from "@/components/chat/Chat";
import LanguageSelector from "@/components/language/LanguageSelector";

export default function Home() {
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [learningLanguage, setLearningLanguage] = useState("");

  const isChatEnabled =
    nativeLanguage !== "" &&
    learningLanguage !== "";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-10">

        {/* Hero */}
        <section className="mb-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            AI Language Tutor
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Helping refugees communicate confidently in a new country through
            natural AI conversations.
          </p>
        </section>

        {/* Language Card */}
        <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl">

          <div className="grid gap-6 md:grid-cols-2">

            <LanguageSelector
              label="🌍 Native Language"
              value={nativeLanguage}
              onChange={setNativeLanguage}
            />

            <LanguageSelector
              label="📚 Learning Language"
              value={learningLanguage}
              onChange={setLearningLanguage}
            />

          </div>

        </section>

        {/* Chat */}
        <Chat enabled={isChatEnabled} />

      </div>
    </main>
  );
}