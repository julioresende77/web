"use client";

import { User, Bot, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isResult?: boolean;
  isError?: boolean;
  timestamp?: Date;
}

export function ChatBubble({
  message,
  isUser,
  isResult,
  isError,
  timestamp,
}: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex gap-4 ${isUser ? "flex-row-reverse" : ""} animate-fade-in`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${
          isUser
            ? "bg-gradient-to-br from-indigo-500 to-purple-600"
            : "bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10"
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-indigo-300" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-4 ${
            isUser
              ? "bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-br-md shadow-lg"
              : isError
                ? "bg-red-500/10 border border-red-500/20 text-red-200 rounded-bl-md"
                : isResult
                  ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-slate-100 rounded-bl-md"
                  : "glass text-slate-200 rounded-bl-md"
          }`}
        >
          {/* Result Badge */}
          {isResult && (
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">
                Resultado Gerado
              </span>
            </div>
          )}

          {/* Message Text */}
          <div className="prose prose-invert prose-sm max-w-none">
            {message.split("\n").map((line, index) => (
              <p key={index} className={line === "" ? "h-2" : "mb-1 last:mb-0"}>
                {line || "\u00A0"}
              </p>
            ))}
          </div>

          {/* Copy Button for Results */}
          {isResult && (
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Copiar resultado"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>
          )}

          {/* Timestamp */}
          {timestamp && (
            <span
              className={`text-xs mt-2 block ${
                isUser ? "text-indigo-200" : "text-slate-500"
              }`}
            >
              {formatTime(timestamp)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
