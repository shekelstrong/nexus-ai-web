"use client";

import { ReactNode } from "react";
import {
  MessageSquare,
  LayoutGrid,
  CreditCard,
  User,
  Sparkles,
  Wallet,
  BookOpen,
  Home,
} from "lucide-react";
import { AmbientBackground } from "./ambient-background";

const nav = [
  { id: "hero", label: "Главная", icon: Home },
  { id: "chat", label: "Чат", icon: MessageSquare },
  { id: "models", label: "Модели", icon: LayoutGrid },
  { id: "articles", label: "Статьи", icon: BookOpen },
  { id: "pricing", label: "Тарифы", icon: CreditCard },
  { id: "profile", label: "Профиль", icon: User },
];

export function AppLayout({
  children,
  activeSection,
  onNavigate,
}: {
  children: ReactNode;
  activeSection?: string;
  onNavigate?: (id: string) => void;
}) {
  return (
    <>
      <AmbientBackground />
      <div className="flex h-screen w-full relative">
        {/* Sidebar */}
        <aside
          className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 z-20"
          style={{
            width: 260,
            background: "rgba(10, 10, 15, 0.7)",
            backdropFilter: "blur(24px)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-2 px-5 pt-5 pb-3">
            <button
              onClick={() => onNavigate?.("hero")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold tracking-tight">NexusAI</span>
            </button>
          </div>

          <nav className="flex-1 px-3 mt-2 space-y-1">
            {nav.map((item) => {
              const active = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate?.(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    active
                      ? "bg-[rgba(124,106,255,0.12)] border border-[rgba(124,106,255,0.25)] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="m-3 p-3 rounded-xl glass-panel">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: "var(--gradient-ai)" }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">Гость</div>
                <div className="text-xs text-white/50 flex items-center gap-1">
                  <Wallet className="w-3 h-3" />
                  1 250 кредитов
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate?.("pricing")}
              className="mt-3 block w-full text-center text-xs font-medium py-2 rounded-lg btn-ai"
            >
              Пополнить
            </button>
          </div>
        </aside>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around p-2 glass-panel border-t border-white/5">
          {nav.slice(0, 5).map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  active ? "text-[#7c6aff]" : "text-white/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
