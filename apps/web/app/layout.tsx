import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Restech AI - Crie Produtos Digitais com Inteligência Artificial",
  description: "Crie produtos digitais, posts virais e anúncios de alta conversão com IA. Autenticação segura com Google.",
  keywords: ["IA", "produtos digitais", "marketing", "chatbot", "inteligência artificial"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
