"use client";

import { Send, Sparkles } from "lucide-react";
import { KeyboardEvent } from "react";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  placeholder = "Digite sua resposta...",
}: ChatInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Input Container */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full pl-5 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
        />

        {/* Sparkle Icon inside input */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Sparkles className="w-5 h-5 text-slate-600" />
        </div>
      </div>

      {/* Send Button */}
      <button
        onClick={onSend}
        disabled={disabled || !value.trim()}
        className={`
          flex items-center justify-center w-14 h-14 rounded-2xl
          transition-all duration-300
          ${
            disabled || !value.trim()
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
          }
        `}
      >
        {disabled ? (
          <div className="w-5 h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
