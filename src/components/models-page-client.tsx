"use client";

import { useState } from "react";
import Link from "next/link";
import { MODEL_CATALOG, getCategoryByModelId } from "@/data/models";
import {
  Sparkles,
  Image,
  Video,
  Search,
  Zap,
  ArrowRight,
  Wand2,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  gen_text: <Sparkles className="w-5 h-5" />,
  gen_image: <Image className="w-5 h-5" />,
  gen_nano_banana: <Zap className="w-5 h-5" />,
  gen_video: <Video className="w-5 h-5" />,
  gen_search: <Search className="w-5 h-5" />,
};

const categoryNames: Record<string, string> = {
  gen_text: "Текст",
  gen_image: "Изображения",
  gen_nano_banana: "Nano Banana",
  gen_video: "Видео",
  gen_search: "Поиск",
};

const tabs = [
  { id: "all", label: "Все" },
  { id: "gen_text", label: "Текст" },
  { id: "gen_image", label: "Дизайн" },
  { id: "gen_video", label: "Видео" },
  { id: "gen_search", label: "Поиск" },
  { id: "gen_nano_banana", label: "Nano Banana" },
];

export default function ModelsPageClient() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Нейросети для изображений, видео, текста и звука
        </h1>
        <p className="text-center text-white/50 mb-8">
          Создавайте контент и тренды на базе лучших ИИ
        </p>

        {/* Tabs */}
        <div className="flex gap-2 justify-center flex-wrap mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-[rgba(124,106,255,0.2)] border border-[rgba(124,106,255,0.4)] text-white"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {Object.entries(MODEL_CATALOG)
            .filter(([cat]) => activeTab === "all" || cat === activeTab)
            .map(([catKey, families]) => (
              <section key={catKey}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-[#ff6b9d]">{categoryIcons[catKey]}</div>
                  <h2 className="text-xl font-semibold">{categoryNames[catKey] || catKey}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(families).map(([famKey, fam]) => (
                    fam.models.map((model) => (
                      <Link
                        key={model.id}
                        href={`/chat?model=${encodeURIComponent(model.id)}`}
                        className="glass-panel glass-panel-hover p-5 group cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Wand2 className="w-4 h-4 text-[color:var(--color-accent-primary)]" />
                            <span className="font-medium">{model.name}</span>
                          </div>
                          <span className="text-xs font-medium text-[color:var(--color-accent-secondary)]">
                            {model.cost} cr
                          </span>
                        </div>
                        <p className="text-sm text-white/50 mb-3 line-clamp-2">
                          {model.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <span className="px-2 py-0.5 rounded-md bg-white/[0.05]">{fam.label}</span>
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[color:var(--color-accent-primary)]" />
                        </div>
                      </Link>
                    ))
                  ))}
                </div>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
}
