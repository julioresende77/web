"use client";

import { useState, useEffect, useRef } from "react";
import { ChatBubble } from "./ui/ChatBubble";
import { ChatInput } from "./ui/ChatInput";
import { LoadingBubble } from "./ui/LoadingBubble";
import { flows } from "@/features/flow/flow.registry";
import {
  MessageSquare,
  Sparkles,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  Target,
  Zap,
} from "lucide-react";

interface FlowOption {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const flowOptions: FlowOption[] = [
  {
    id: "create-product",
    name: "Criar Produto",
    description: "Produto digital completo com nome, promessa e estratégia",
    icon: Lightbulb,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "create-post",
    name: "Criar Post",
    description: "Post viral com gancho, roteiro e CTA otimizado",
    icon: MessageSquare,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "create-ads",
    name: "Criar Anúncio",
    description: "Anúncio de alta conversão com copy AIDA",
    icon: Target,
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: "ai-seller",
    name: "Vendedor IA",
    description: "Simulação de venda com quebra de objeções",
    icon: Zap,
    gradient: "from-violet-500 to-purple-500",
  },
];

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [flowId, setFlowId] = useState<string | null>(null);
  const [showFlowSelector, setShowFlowSelector] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  function selectFlow(selectedFlowId: string) {
    const flow = (flows as Record<string, any>)[selectedFlowId];
    if (!flow) return;

    setFlowId(selectedFlowId);
    setShowFlowSelector(false);
    setStepIndex(0);
    setAnswers({});
    setMessages([
      {
        text: `✨ Ótima escolha! Vamos ${flow.name.toLowerCase()}.\n\n${flow.steps[0].question}`,
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }

  function resetChat() {
    setMessages([]);
    setInput("");
    setStepIndex(0);
    setAnswers({});
    setFlowId(null);
    setShowFlowSelector(true);
  }

  async function handleSend() {
    if (!input.trim() || !flowId) return;

    const updatedAnswers = { ...answers, [stepIndex]: input.trim() };
    const currentStepIndex = stepIndex;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        text: input.trim(),
        isUser: true,
        timestamp: new Date(),
      },
    ]);

    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flowId,
          stepIndex: currentStepIndex,
          answers: updatedAnswers,
        }),
      });

      if (!res.ok) throw new Error("Falha na comunicação");

      const data = await res.json();

      if (data.type === "question") {
        setStepIndex(currentStepIndex + 1);
        setMessages((prev) => [
          ...prev,
          {
            text: data.data.question,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
      } else if (data.type === "result") {
        setMessages((prev) => [
          ...prev,
          {
            text: data.data,
            isUser: false,
            isResult: true,
            timestamp: new Date(),
          },
        ]);
      }

      setAnswers(updatedAnswers);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Ocorreu um erro. Tente novamente.",
          isUser: false,
          isError: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Flow Selector View
  if (showFlowSelector) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-300">Assistente IA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            O que você quer{" "}
            <span className="gradient-text">criar hoje?</span>
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Escolha uma opção abaixo e nossa IA vai guiar você passo a passo
            para criar conteúdo de alta qualidade.
          </p>
        </div>

        {/* Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {flowOptions.map((flow) => (
            <button
              key={flow.id}
              onClick={() => selectFlow(flow.id)}
              className="group relative overflow-hidden rounded-2xl glass p-6 text-left transition-all hover:scale-[1.02] hover:border-white/20"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${flow.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative flex items-start gap-4"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${flow.gradient} shadow-lg`}
                >
                  <flow.icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1"
                  >
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors"
                    >
                      {flow.name}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <p className="text-sm text-slate-400">{flow.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            💡 Dica: Seja específico nas suas respostas para obter resultados melhores
          </p>
        </div>
      </div>
    );
  }

  // Chat View
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Chat Container */}
      <div className="glass rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5"
        >
          <div className="flex items-center gap-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                {flowId
                  ? flowOptions.find((f) => f.id === flowId)?.name || "Assistente"
                  : "Assistente"}
              </h2>
              <div className="flex items-center gap-1.5"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"
                ></div>
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>

          <button
            onClick={resetChat}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Novo chat</span>
          </button>
        </div>

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4"
              >
                <MessageSquare className="w-8 h-8 text-indigo-400" />
              </div>
              <p className="text-slate-400">Comece a conversar com a IA</p>
            </div>
          )}

          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              message={msg.text}
              isUser={msg.isUser}
              isResult={msg.isResult}
              isError={msg.isError}
              timestamp={msg.timestamp}
            />
          ))}

          {loading && <LoadingBubble />}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 bg-white/5"
        >
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            disabled={loading}
            placeholder="Digite sua resposta..."
          />
        </div>
      </div>

      {/* Progress indicator */}
      {flowId && (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500"
        >
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span>
            Etapa {stepIndex + 1} de{" "}
            {(flows as Record<string, any>)[flowId]?.steps.length || "?"}
          </span>
        </div>
      )}
    </div>
  );
}
