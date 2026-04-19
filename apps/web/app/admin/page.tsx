"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import {
  Crown,
  Users,
  CreditCard,
  TrendingUp,
  Check,
  X,
  Loader2,
  ArrowLeft,
  Shield,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

// Admin email - only this user can access
const ADMIN_EMAIL = "julioresende07@gmail.com";

interface UserData {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  is_pro: boolean;
  pro_until?: string;
  plan_type?: string;
  created_at: string;
  last_sign_in?: string;
}

interface Stats {
  total: number;
  pro: number;
  free: number;
  monthly: number;
  semester: number;
  yearly: number;
}

export default function AdminDashboard() {
  const { user, loading: userLoading } = useUser();
  const [users, setUsers] = useState<UserData[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pro: 0,
    free: 0,
    monthly: 0,
    semester: 0,
    yearly: 0,
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pro" | "free">("all");

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user]);

  async function fetchUsers() {
    setLoading(true);

    // Fetch profiles from Supabase
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      // If table doesn't exist, create mock data
      setUsers([]);
      setStats({
        total: 0,
        pro: 0,
        free: 0,
        monthly: 0,
        semester: 0,
        yearly: 0,
      });
    } else {
      setUsers(profiles || []);

      // Calculate stats
      const proUsers = profiles?.filter((u) => u.is_pro) || [];
      setStats({
        total: profiles?.length || 0,
        pro: proUsers.length,
        free: (profiles?.length || 0) - proUsers.length,
        monthly: proUsers.filter((u) => u.plan_type === "monthly").length,
        semester: proUsers.filter((u) => u.plan_type === "semester").length,
        yearly: proUsers.filter((u) => u.plan_type === "yearly").length,
      });
    }

    setLoading(false);
  }

  async function togglePro(userId: string, currentStatus: boolean) {
    setUpdating(userId);

    const { error } = await supabase
      .from("profiles")
      .update({
        is_pro: !currentStatus,
        pro_until: !currentStatus
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
          : null,
        plan_type: !currentStatus ? "yearly" : null,
      })
      .eq("id", userId);

    if (error) {
      console.error("Error updating user:", error);
      alert("Erro ao atualizar usuário");
    } else {
      await fetchUsers();
    }

    setUpdating(null);
  }

  const filteredUsers = users.filter((u) => {
    if (filter === "pro") return u.is_pro;
    if (filter === "free") return !u.is_pro;
    return true;
  });

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <Shield className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Acesso Restrito</h1>
          <p className="text-slate-400 mb-6">
            Faça login para acessar o dashboard
          </p>
          <Link href="/" className="btn btn-primary">
            Ir para Login
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
          <p className="text-slate-400 mb-6">
            Você não tem permissão para acessar esta área.
          </p>
          <Link href="/" className="btn btn-primary">
            Voltar para Início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Link>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-500" />
              Dashboard Admin
            </h1>
          </div>

          <button
            onClick={fetchUsers}
            className="btn btn-secondary"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Atualizar"
            )}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <StatCard
            icon={Users}
            label="Total Usuários"
            value={stats.total}
            color="indigo"
          />
          <StatCard
            icon={Crown}
            label="Usuários PRO"
            value={stats.pro}
            color="amber"
          />
          <StatCard
            icon={UserCheck}
            label="Usuários Free"
            value={stats.free}
            color="slate"
          />
          <StatCard
            icon={CreditCard}
            label="Mensal"
            value={stats.monthly}
            color="blue"
          />
          <StatCard
            icon={CreditCard}
            label="Semestral"
            value={stats.semester}
            color="purple"
          />
          <StatCard
            icon={TrendingUp}
            label="Anual"
            value={stats.yearly}
            color="green"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <FilterButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label="Todos"
            count={stats.total}
          />
          <FilterButton
            active={filter === "pro"}
            onClick={() => setFilter("pro")}
            label="PRO"
            count={stats.pro}
          />
          <FilterButton
            active={filter === "free"}
            onClick={() => setFilter("free")}
            label="Free"
            count={stats.free}
          />
        </div>

        {/* Users Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 font-medium text-slate-400">Usuário</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-400">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-400">Plano</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-400">Expira</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-400">Cadastro</th>
                  <th className="text-left py-4 px-6 font-medium text-slate-400">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-slate-500"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Carregando...
                        </div>
                      ) : (
                        "Nenhum usuário encontrado"
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium"
                          >
                            {user.avatar_url ? (
                              <img
                                src={user.avatar_url}
                                alt={user.name}
                                className="w-10 h-10 rounded-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            ) : (
                              user.name?.charAt(0).toUpperCase() || "U"
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{user.name || "Sem nome"}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                            user.is_pro
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-500/20 text-slate-400"
                          }`}
                        >
                          {user.is_pro ? (
                            <>
                              <Crown className="w-3.5 h-3.5" /> PRO
                            </>
                          ) : (
                            "Free"
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-300 capitalize">
                          {user.plan_type || "-"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-400">
                          {user.pro_until
                            ? new Date(user.pro_until).toLocaleDateString(
                                "pt-BR"
                              )
                            : "-"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-400">
                          {new Date(user.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => togglePro(user.id, user.is_pro)}
                          disabled={updating === user.id}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            user.is_pro
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          }`}
                        >
                          {updating === user.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : user.is_pro ? (
                            <>
                              <X className="w-4 h-4" /> Remover PRO
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" /> Tornar PRO
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    indigo: "from-indigo-500/20 to-indigo-500/10 text-indigo-400",
    amber: "from-amber-500/20 to-amber-500/10 text-amber-400",
    slate: "from-slate-500/20 to-slate-500/10 text-slate-400",
    blue: "from-blue-500/20 to-blue-500/10 text-blue-400",
    purple: "from-purple-500/20 to-purple-500/10 text-purple-400",
    green: "from-green-500/20 to-green-500/10 text-green-400",
  };

  return (
    <div
      className={`glass rounded-2xl p-6 bg-gradient-to-br ${colorClasses[color]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80 mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? "bg-indigo-500 text-white"
          : "bg-white/5 text-slate-400 hover:bg-white/10"
      }`}
    >
      {label}
      <span className="ml-2 opacity-60">({count})</span>
    </button>
  );
}
