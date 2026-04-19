"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import {
  Check,
  ArrowLeft,
  Loader2,
  CreditCard,
  Shield,
  Sparkles,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
}

const plans: Record<string, Plan> = {
  monthly: {
    id: "monthly",
    name: "Mensal",
    price: 97,
    period: "mês",
    description: "Acesso completo por 1 mês",
  },
  semester: {
    id: "semester",
    name: "Semestral",
    price: 462,
    period: "6 meses",
    description: "Economize 20% - Acesso por 6 meses",
  },
  yearly: {
    id: "yearly",
    name: "Anual",
    price: 684,
    period: "ano",
    description: "Economize 40% - Acesso por 12 meses",
  },
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const { user, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const planId = searchParams.get("plan") || "monthly";
  const plan = plans[planId] || plans.monthly;

  // If user is not logged in, redirect to home
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/";
    }
  }, [user, userLoading]);

  async function handleCheckout() {
    setLoading(true);

    // In a real implementation, you would integrate with Stripe here
    // For now, we'll simulate the checkout process

    // Simulate API call to create checkout session
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo purposes, activate PRO directly
    const expiryDate = new Date();
    if (planId === "monthly") expiryDate.setMonth(expiryDate.getMonth() + 1);
    if (planId === "semester") expiryDate.setMonth(expiryDate.getMonth() + 6);
    if (planId === "yearly") expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    // Update user profile to PRO
    const { error } = await supabase.from("profiles").upsert({
      id: user?.id,
      is_pro: true,
      pro_until: expiryDate.toISOString(),
      plan_type: planId,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error updating profile:", error);
      alert("Erro ao ativar assinatura. Tente novamente.");
    } else {
      // Redirect to success page or home
      window.location.href = "/?success=true";
    }

    setLoading(false);
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600"
          >
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Finalizar Assinatura</h1>
          <p className="text-slate-400">Revise seu plano e complete o pagamento</p>
        </div>

        {/* Checkout Card */}
        <div className="glass rounded-3xl overflow-hidden">
          {/* Plan Header */}
          <div className="p-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-b border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Plano {plan.name}</h2>
                <p className="text-slate-400">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  R$ {plan.price.toFixed(2)}
                </div>
                <div className="text-sm text-slate-400">/{plan.period}</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="p-8">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
              O que está incluído
            </h3>

            <ul className="space-y-3 mb-8">
              {[
                "Criação ilimitada de produtos digitais",
                "Posts ilimitados para redes sociais",
                "Anúncios de alta conversão",
                "Vendedor IA para simulações",
                "Suporte prioritário",
                "Atualizações gratuitas",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Security Note */}
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl mb-8">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-sm text-slate-400">
                Pagamento seguro processado com criptografia SSL
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl mb-8"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium"
              >
                {user?.user_metadata?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-medium">{user?.user_metadata?.name || "Usuário"}</p>
                <p className="text-sm text-slate-400">{user?.email}</p>
              </div>
            </div>

            {/* Demo Note */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6"
            >
              <div className="flex items-start gap-3"
              >
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-200">
                    <strong>Modo Demo:</strong> Esta é uma demonstração. Em
                    produção, esta página integraria com Stripe para
                    processamento de pagamentos reais.
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full btn btn-primary py-4 text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  Assinar Agora - R$ {plan.price.toFixed(2)}
                </>
              )}
            </button>

            <p className="text-center mt-4 text-sm text-slate-500">
              Cancele quando quiser. Sem taxas ocultas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
