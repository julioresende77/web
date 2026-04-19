"use client";

import { supabase } from "@/lib/supabase";
import { Sparkles, ArrowRight, Shield, Zap, Users } from "lucide-react";

export default function Auth() {
  async function loginWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  }

  const features = [
    { icon: Zap, text: "Crie produtos digitais em minutos" },
    { icon: Users, text: "Gere posts que viralizam" },
    { icon: Shield, text: "Anúncios de alta conversão" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-glow animate-float">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="gradient-text">Restech AI</span>
          </h1>
          <p className="text-lg text-slate-400">
            Crie produtos digitais com inteligência artificial
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Bem-vindo de volta</h2>
            <p className="text-slate-400">
              Faça login para acessar todas as funcionalidades
            </p>
          </div>

          {/* Google Button */}
          <button
            onClick={loginWithGoogle}
            className="btn btn-google w-full py-4 text-base mb-6 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>Continuar com Google</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 text-slate-500 bg-[#0f0a1a]">O que você vai criar</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all"
                >
                  <feature.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-slate-300 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-sm text-slate-500">
          Ao fazer login, você concorda com nossos{" "}
          <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Termos de Serviço
          </a>
        </p>
      </div>
    </div>
  );
}
