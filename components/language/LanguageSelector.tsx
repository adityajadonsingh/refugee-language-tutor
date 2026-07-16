"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { languages } from "@/lib/languages";
import { Language } from "@/types/language";
import LanguageDialog from "./LanguageDialog";

interface LanguageSelectorProps {
  label: string;
  value: Language | null;
  onChange: (language: Language) => void;
  exclude?: string;
}

export default function LanguageSelector({
  label,
  value,
  onChange,
  exclude,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);

  const filteredLanguages = languages.filter(
    (language) => language.code !== exclude,
  );

  const selectedLanguage = value;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          p-4
          text-left
          transition-all
          hover:border-blue-500
          hover:bg-zinc-900
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">{label}</p>

            {selectedLanguage ? (
              <>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {selectedLanguage.nativeName}
                </h3>

                <p className="text-sm text-zinc-500">{selectedLanguage.name}</p>
              </>
            ) : (
              <>
                <h3 className="mt-2 text-lg text-zinc-300">Select language</h3>

                <p className="text-sm text-zinc-500">Tap to choose</p>
              </>
            )}
          </div>

          <ChevronRight className="text-zinc-500" size={20} />
        </div>
      </button>

      <LanguageDialog
        open={open}
        onOpenChange={setOpen}
        languages={filteredLanguages}
        selected={value}
        onSelect={onChange}
      />
    </>
  );
}
