"use client";

import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import { Language } from "@/types/language";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

interface LanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  languages: Language[];
  selected: Language | null;
  onSelect: (language: Language) => void;
}

export default function LanguageDialog({
  open,
  onOpenChange,
  languages,
  selected,
  onSelect,
}: LanguageDialogProps) {
  const [search, setSearch] = useState("");

  const filteredLanguages = useMemo(() => {
    return languages.filter((language) => {
      const value =
        `${language.nativeName} ${language.name}`.toLowerCase();

      return value.includes(search.toLowerCase());
    });
  }, [languages, search]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-zinc-800 bg-zinc-900 text-white">

        <DialogHeader>
          <DialogTitle>
            Select Language
          </DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search language..."
            className="pl-10"
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto">

          {filteredLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                onSelect(language);
                onOpenChange(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition hover:bg-zinc-800 ${
                selected?.code === language.code
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              <div className="text-left">
                <div className="text-lg font-medium">
                  {language.nativeName}
                </div>

                <div className="text-sm text-zinc-400">
                  {language.name}
                </div>
              </div>

              {selected?.code === language.code && "✓"}
            </button>
          ))}

        </div>

      </DialogContent>
    </Dialog>
  );
}