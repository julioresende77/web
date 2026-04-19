"use client";

import { useUser } from "@/hooks/useUser";
import Auth from "@/components/Auth";
import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse"
            >
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
            <p className="text-slate-400">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  // Se não estiver logado, mostra a landing page
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <LandingPage />
      </div>
    );
  }

  // Se estiver logado, mostra o chat
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ChatBox />
      </main>
    </div>
  );
}
