"use client";

import { useUser } from "@/hooks/useUser";
import Auth from "@/components/Auth";
import ChatBox from "@/components/ChatBox";

export default function Home() {
  const { user, loading } = useUser();

  if (loading) return <p>Carregando...</p>;

  if (!user) return <Auth />;

  return <ChatBox />;
}