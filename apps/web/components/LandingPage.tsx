"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Sparkles,
  Check,
  Zap,
  Crown,
  Star,
  ArrowRight,
  MessageSquare,
  Target,
  Lightbulb,
  Shield,
  Loader2,
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  periodLabel: string;
  discount?: string;
  icon: React.ElementType;
  features: string[];
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "monthly",
    name: "Mensal",
    description: "Ideal para começar",
    price: 97,
    period: "month",
    periodLabel: "/mês",
    icon: Star,
    features: [
      "Criação ilimitada de produtos",
      "Posts ilimitados para redes sociais",
      "Anúncios de alta conversão",
      "Suporte por email",
      "Acesso a todas as ferramentas",
    ],
  },
  {
    id: "semester",
    name: "Semestral",
    description: "Mais popular",
    price: 77,
    period: "month",
    periodLabel: "/mês",
    discount: "20% OFF",
    icon: Zap,
    popular: true,
    features: [
      "Tudo do plano Mensal",
      "20% de desconto",
      "Prioridade no suporte",
      "Modelos exclusivos",
      "Relatórios de performance",
      "Cobrança a cada 6 meses",
    ],
  },
  {
    id: "yearly",
    name: "Anual",
    description: "Melhor custo-benefício",
    price: 57,
    period: "month",
    periodLabel: "/mês",
    discount: "40% OFF",
    icon: Crown,
    features: [
      "Tudo do plano Semestral",
      "40% de desconto",
      "Suporte prioritário 24/7",
      "Consultoria mensal",
      "Acesso antecipado a novidades",
      "Cobrança anual",
    ],
  },
];

const features = [
  {
    icon: Lightbulb,
    title: "Produtos Digitais",
    description: "Crie produtos completos com nome, promessa e estratégia",
  },
  {
    icon: MessageSquare,
    title: "Posts Virais",
    description: "Gancho, roteiro e CTA otimizados para engajamento",
  },
  {
    icon: Target,
    title: "Anúncios Profissionais",
    description: "Copy AIDA completa com gatilhos mentais",
  },
  {
    icon: Shield,
    title: "Vendedor IA",
    description: "Simulação real de vendas com quebra de objeções",
  },
];

export default function LandingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function startCheckout(planId: string) {
    setLoading(planId);

    // Check if user is logged in
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // Redirect to auth with plan in URL
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/checkout?plan=${planId}`,
        },
      });
    } else {
      // User is logged in, go to checkout
      window.location.href = `/checkout?plan=${planId}`;
    }

    setLoading(null);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:py-32 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-300">Lançamento Exclusivo</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 leading-tight">
            Crie conteúdo com{" "}
            <span className="gradient-text">Inteligência Artificial</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Produtos digitais, posts virais e anúncios de alta conversão em
            minutos. Assine agora e transforme sua criação de conteúdo.
          </p>

          <a
            href="#planos"
            className="btn btn-primary text-lg px-8 py-4 inline-flex"
          >
            Ver Planos
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">O que você vai criar</h2>
            <p className="text-slate-400">
              Ferramentas poderosas para impulsionar seu negócio digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 hover:border-indigo-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all"
                >
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Escolha seu plano</h2>
            <p className="text-slate-400">
              Comece agora e cancele quando quiser. Sem taxa de cancelamento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border-2 border-indigo-500/50 shadow-glow"
                    : "glass border border-white/10"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-4 py-1 rounded-full"
                    >
                      Mais Popular
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.popular
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                        : "bg-white/5"
                    }`}
                  >
                    <plan.icon
                      className={`w-6 h-6 ${
                        plan.popular ? "text-white" : "text-indigo-400"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-slate-400">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      R$ {plan.price}
                    </span>
                    <span className="text-slate-400">{plan.periodLabel}</span>
                  </div>
                  {plan.discount && (
                    <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full"
                    >
                      {plan.discount}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                      >
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => startCheckout(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "btn btn-primary"
                      : "bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {loading === plan.id ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Assinar Agora"
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-slate-500">
              Pagamento seguro via Stripe. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Junte-se a milhares de criadores que já estão usando a Restech AI
              para acelerar sua produção de conteúdo.
            </p>

            <a href="#planos" className="btn btn-primary text-lg px-8 py-4 inline-flex">
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Restech AI</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="/termos" className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Termos de Serviço
            </a>
            <span className="text-slate-600">© 2025 Restech AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
