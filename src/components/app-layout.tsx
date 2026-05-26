"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  LayoutGrid,
  CreditCard,
  User,
  Sparkles,
  Wallet,
} from "lucide-react";
import { AmbientBackground } from "./ambient-background";

const nav = [
  { href: "/chat", label: "Чат", icon: MessageSquare },
  { href: "/models", label: "Модели", icon: LayoutGrid },
  { href: "/pricing", label: "Тарифы", icon: CreditCard },
  { href: "/profile", label: "Профиль", icon: User },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AmbientBackground />
      <div className="flex h-screen w-full relative">
        {/* Sidebar */}
        <aside
          className="hidden md:flex flex-col h-screen sticky top-0 shrink-0"
          style={{
            width: 260,
            background: "rgba(10, 10, 15, 0.7)",
            backdropFilter: "blur(24px)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-2 px-5 pt-5 pb-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">NexusAI</span>
          </div>

          <nav className="flex-1 px-3 mt-2 space-y-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-[rgba(124,106,255,0.12)] border border-[rgba(124,106,255,0.25)] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="m-3 p-3 rounded-xl glass-panel">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full shrink-0"
                style={{ background: "var(--gradient-ai)" }}
              >
                <User className="w-4 h-4 text-white m-auto mt-2" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">Гость</div>
                <div className="text-xs text-white/50 flex items-center gap-1">
                  <Wallet className="w-3 h-3" />
                  1 250 кредитов
                </div>
              </div>
            </div>
            <Link
              href="/pricing"
              className="mt-3 block text-center text-xs font-medium py-2 rounded-lg btn-ai"
            >
              Пополнить
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
