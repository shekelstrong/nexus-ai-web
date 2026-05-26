import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ambient-background";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  User,
  Bot,
} from "lucide-react";

const ARTICLES = [
  {
    id: 1,
    title: "Как писать промпты для Seedream: полный гайд",
    excerpt:
      "Разбираем структуру промптов для Bytedance Seedream: негатив, стили, референсы, aspect ratio.",
    author: "Nexus Team",
    date: "May 15, 2025",
    readTime: "8 мин",
    tag: "Гайды",
  },
  {
    id: 2,
    title: "Flux vs Seedream: что выбрать в 2025",
    excerpt:
      "Сравнение двух топовых image-моделей: качество, скорость, цена, референсы.",
    author: "Nexus Team",
    date: "May 10, 2025",
    readTime: "5 мин",
    tag: "Сравнения",
  },
  {
    id: 3,
    title: "Реферальная программа: как заработать на AI",
    excerpt:
      "Приглашай друзей, получай 10% от их пополнений. Пошаговая инструкция.",
    author: "Nexus Team",
    date: "May 5, 2025",
    readTime: "3 мин",
    tag: "Новости",
  },
];

export default function ArticlesPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <AmbientBackground />

      {/* Header */}
      <nav className="relative z-20 w-full border-b border-white/[0.06] backdrop-blur-xl bg-[#0a0a0f]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#7c6aff] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Nexus <span className="text-[#7c6aff]">AI</span>
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                ← На главную
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c6aff]/10 border border-[#7c6aff]/20 text-[#7c6aff] text-xs mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            База знаний
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Статьи и <span className="text-[#7c6aff]">гайды</span>
          </h1>
          <p className="text-white/50 max-w-xl">
            Практические материалы по генерации, промпт-инжинирингу и заработку на AI.
          </p>
        </div>

        <div className="space-y-6">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="glass-panel p-6 rounded-lg hover:bg-white/[0.06] transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#7c6aff]/10 border border-[#7c6aff]/20 flex items-center justify-center shrink-0 group-hover:bg-[#7c6aff]/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-[#7c6aff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#00d4ff]/10 text-[#00d4ff] text-xs font-medium">
                      {article.tag}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 group-hover:text-[#7c6aff] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-white/40 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#7c6aff]/20 transition-colors">
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#7c6aff] transition-colors" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-white/30">
          © 2025 Nexus AI. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
