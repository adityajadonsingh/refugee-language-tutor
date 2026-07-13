"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { languages } from "@/lib/languages";

interface LanguageSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function LanguageSelector({
  label,
  value,
  onChange,
}: LanguageSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-400">
        {label}
      </label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className="
            h-12
            rounded-xl
            border-zinc-700
            bg-zinc-950
            text-white
            shadow-none
            transition-all
            hover:border-blue-500
            focus:ring-2
            focus:ring-blue-500
          "
        >
          <SelectValue placeholder="Select language" />
        </SelectTrigger>

        <SelectContent
          className="
            border-zinc-700
            bg-zinc-900
            text-white
          "
        >
          {languages.map((language) => (
            <SelectItem
              key={language}
              value={language}
              className="
                cursor-pointer
                rounded-md
                text-white
                focus:bg-zinc-800
                focus:text-white
                data-[highlighted]:bg-zinc-800
                data-[highlighted]:text-white
              "
            >
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}