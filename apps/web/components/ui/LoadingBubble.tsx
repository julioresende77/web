"use client";

import { Sparkles } from "lucide-react";

export function LoadingBubble() {
  return (
    <div className="flex gap-4 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10">
        <Sparkles className="w-5 h-5 text-indigo-300" />
      </div>

      {/* Loading Content */}
      <div className="glass rounded-2xl rounded-bl-md px-5 py-4 min-w-[200px]">
        <div className="flex items-center gap-3">
          {/* Animated dots */}
          <div className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>

          <span className="text-sm text-slate-400">A IA está pensando...</span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse w-2/3" />
        </div>
      </div>
    </div>
  );
}
