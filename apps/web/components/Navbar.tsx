"use client";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { Sparkles, LogOut, User, ChevronDown, Crown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// Admin email - show admin link for this user
const ADMIN_EMAIL = "julioresende07@gmail.com";

export default function Navbar() {
  const { user, loading } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Usuário";
  const userAvatar = user?.user_metadata?.avatar_url;
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-glow-sm group-hover:shadow-glow transition-shadow"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Restech AI
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {!loading && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative">
                    {userAvatar && !avatarError ? (
                      <img
                        src={userAvatar}
                        alt={userName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white/10"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-white/10 text-white font-medium text-sm"
                      >
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-[#0f0a1a]"
                    ></div>
                  </div>

                  {/* Name & Dropdown icon */}
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-200">
                      {userName}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-strong shadow-2xl py-2 animate-fade-in border border-white/10"
                  >
                    <div className="px-4 py-3 border-b border-white/5"
                    >
                      <p className="text-sm font-medium text-white">{userName}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>

                    {/* Admin Link */}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-amber-400 hover:bg-amber-500/10 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Crown className="w-4 h-4" />
                        <span>Dashboard Admin</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sair da conta</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              !loading && (
                <a
                  href="/"
                  className="btn btn-primary text-sm px-6 py-2.5"
                >
                  Entrar
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
