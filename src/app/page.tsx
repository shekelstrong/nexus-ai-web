"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AppLayout } from "@/components/app-layout";
import { AmbientBackground } from "@/components/ambient-background";
import {
  Bot,
  ArrowDown,
  ChevronDown,
  Send,
  Sparkles,
  Globe,
  Brain,
  Zap,
  Image,
  Video,
  BookOpen,
  CreditCard,
  User,
  Check,
  Loader2,
  Clock,
} from "lucide-react";

/* ─── Chat Section ─── */
import ChatInterface from "@/components/chat-interface";

/* ─── Models Section ─── */
import ModelsPageClient from "@/components/models-page-client";

/* ─── Articles Section ─── */
const ARTICLES = [
  {
    id: 1,
    title: "Как писать промпты для Seedream",
    excerpt: "Разбираем структуру промптов для Bytedance Seedream.",
    tag: "Гайды",
    date: "May 15, 2025",
  },
  {
    id: 2,
    title: "Flux vs Seedream: что выбрать",
    excerpt: "Сравнение двух топовых image-моделей.",
    tag: "Сравнения",
    date: "May 10, 2025",
  },
  {
    id: 3,
    title: "Реферальная программа",
    excerpt: "Приглашай друзей, получай 10% от пополнений.",
    tag: "Новости",
    date: "May 5, 2025",
  },
];

/* ─── Pricing Section ─── */
const PRICING_TIERS = [
  {
    name: "Basic",
    price: "0",
    period: "/мес",
    description: "Идеально для знакомства с AI",
    features: [
      "10 текстовых запросов/день",
      "3 image-генерации/день",
      "GPT-4o-mini, Gemini Flash",
      "Базовая поддержка",
    ],
    cta: "Начать бесплатно",
    highlight: false,
  },
  {
    name: "Pro",
    price: "499",
    period: "/мес",
    description: "Для регулярной работы с AI",
    features: [
      "Безлимитные текстовые запросы",
      "50 image-генераций/день",
      "Все модели (GPT-4o, Claude, Gemini)",
      "Приоритетная поддержка",
      "Доступ к video-генерации",
    ],
    cta: "Перейти на Pro",
    highlight: true,
  },
  {
    name: "VIP",
    price: "1499",
    period: "/мес",
    description: "Максимальные возможности",
    features: [
      "Безлимит на всё",
      "Ранний доступ к новым моделям",
      "API-доступ",
      "Личный менеджер",
      "Кастомные fine-tune модели",
    ],
    cta: "Связаться",
    highlight: false,
  },
];

/* ─── Profile Section ─── */
function ProfileSection() {
  const [tab, setTab] = useState<"overview" | "history" | "settings">("overview");
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-panel rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#7c6aff] to-[#00d4ff] flex items-center justify-center text-xl font-bold">
            N
          </div>
          <div>
            <h3 className="text-xl font-semibold">Nedopekin</h3>
            <p className="text-white/50 text-sm">ID: 42 • Telegram</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="glass-panel rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[#7c6aff]">₽1,250</div>
            <div className="text-xs text-white/50 mt-1">Баланс</div>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[#00d4ff]">847</div>
            <div className="text-xs text-white/50 mt-1">Запросов</div>
          </div>
          <div className="glass-panel rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[#ff6b9d]">12</div>
            <div className="text-xs text-white/50 mt-1">Рефералов</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        {(["overview", "history", "settings"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              tab === t
                ? "bg-[rgba(124,106,255,0.2)] text-white border border-[rgba(124,106,255,0.3)]"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {t === "overview" ? "Обзор" : t === "history" ? "История" : "Настройки"}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-2xl p-6">
        {tab === "overview" && (
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/50">Реферальная ссылка</span>
              <code className="text-xs bg-white/5 px-2 py-1 rounded">https://t.me/nexsai_bot?start=ref_42</code>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/50">Тариф</span>
              <span className="text-[#7c6aff]">Pro</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/50">До окончания</span>
              <span className="text-white/70">14 дней</span>
            </div>
          </div>
        )}
        {tab === "history" && (
          <div className="text-center text-white/50 py-8">История запросов появится здесь</div>
        )}
        {tab === "settings" && (
          <div className="text-center text-white/50 py-8">Настройки уведомлений и языка</div>
        )}
      </div>
    </div>
  );
}

/* ─── Hero Section ─── */
function HeroSection({ onScroll }: { onScroll: (id: string) => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm mb-8">
          <Sparkles className="w-4 h-4 text-[#7c6aff]" />
          <span className="text-white/80">12+ моделей • GPT-4o, Claude, Gemini, Seedream</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c6aff] via-[#00d4ff] to-[#ff6b9d]">
            NexusAI
          </span>
        </h1>
        <p className="text-xl text-white/70 mb-8 max-w-xl mx-auto">
          Единый интерфейс к лучшим нейросетям. Чат, генерация изображений и видео — всё в одном месте.
        </p>
        <div className="flex gap-4 justify-center mb-12">
          <button
            onClick={() => onScroll("chat")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#7c6aff] to-[#00d4ff] text-white font-semibold hover:scale-105 transition-transform"
          >
            Стартовать бесплатно
          </button>
          <button
            onClick={() => onScroll("models")}
            className="px-8 py-3 rounded-xl glass-panel text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Каталог моделей
          </button>
        </div>
        <button onClick={() => onScroll("chat")} className="animate-bounce text-white/50 hover:text-white transition-colors">
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const sections = ["hero", "chat", "models", "articles", "pricing", "profile"];

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Swipe handling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.changedTouches[0].screenY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      touchEndY.current = e.changedTouches[0].screenY;
      const diff = touchStartY.current - touchEndY.current;
      if (Math.abs(diff) < 50) return;

      const idx = sections.indexOf(activeSection);
      if (diff > 0 && idx < sections.length - 1) {
        scrollTo(sections[idx + 1]);
      } else if (diff < 0 && idx > 0) {
        scrollTo(sections[idx - 1]);
      }
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [activeSection, scrollTo]);

  return (
    <AppLayout activeSection={activeSection} onNavigate={scrollTo}>
      <div ref={containerRef} className="relative snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth">
        <AmbientBackground />

        <div className="snap-start snap-always min-h-screen">
          <HeroSection onScroll={scrollTo} />
        </div>

        <div id="chat" className="snap-start snap-always min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-6 h-6 text-[#7c6aff]" />
              <h2 className="text-2xl font-bold">AI Чат</h2>
            </div>
            <ChatInterface />
          </div>
        </div>

        <div id="models" className="snap-start snap-always min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#00d4ff]" />
              <h2 className="text-2xl font-bold">Каталог моделей</h2>
            </div>
            <ModelsPageClient />
          </div>
        </div>

        <div id="articles" className="snap-start snap-always min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-[#ff6b9d]" />
              <h2 className="text-2xl font-bold">Статьи и гайды</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ARTICLES.map((a) => (
                <div key={a.id} className="glass-panel rounded-2xl p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="inline-block px-3 py-1 rounded-full text-xs bg-[rgba(255,107,157,0.15)] text-[#ff6b9d] mb-3">
                    {a.tag}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{a.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    {a.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="pricing" className="snap-start snap-always min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-[#7c6aff]" />
              <h2 className="text-2xl font-bold">Тарифы</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className={`glass-panel rounded-2xl p-6 flex flex-col ${
                    tier.highlight ? "border-[#7c6aff] border-2" : ""
                  }`}
                >
                  {tier.highlight && (
                    <div className="text-xs font-semibold text-[#7c6aff] mb-2">Популярный</div>
                  )}
                  <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                  <div className="text-3xl font-bold mb-1">
                    {tier.price}₽<span className="text-sm text-white/50 font-normal">{tier.period}</span>
                  </div>
                  <p className="text-sm text-white/50 mb-4">{tier.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[#7c6aff] mt-0.5 shrink-0" />
                        <span className="text-white/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 rounded-xl font-semibold transition-all ${
                      tier.highlight
                        ? "bg-gradient-to-r from-[#7c6aff] to-[#00d4ff] text-white hover:scale-105"
                        : "glass-panel hover:bg-white/10"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="profile" className="snap-start snap-always min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-[#00d4ff]" />
              <h2 className="text-2xl font-bold">Профиль</h2>
            </div>
            <ProfileSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
