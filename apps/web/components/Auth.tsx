"use client";

import { supabase } from "@/lib/supabase";

export default function Auth() {
  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={login}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Entrar com Google
      </button>
    </div>
  );
}