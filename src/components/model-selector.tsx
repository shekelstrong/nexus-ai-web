"use client";

import { motion } from "framer-motion";
import { ChevronRight, Bot, Image, Video, Search, Banana } from "lucide-react";
import { MODEL_CATALOG, CATEGORY_ICONS } from "@/data/models";
import { useState } from "react";

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
  gen_text: "Текст",
  gen_image: "Изображения",
  gen_nano_banana: "Nano Banana",
  gen_video: "Видео",
  gen_search: "Поиск",
};

const categoryIcons: Record<string, React.ReactNode> = {
  gen_text: <Bot className="w-4 h-4" />,
  gen_image: <Image className="w-4 h-4" />,
  gen_nano_banana: <Banana className="w-4 h-4" />,
  gen_video: <Video className="w-4 h-4" />,
  gen_search: <Search className="w-4 h-4" />,
};

export default function ModelSelector({ selected, onSelect }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div className="p-2 space-y-1">
      {Object.entries(MODEL_CATALOG).map(([category, families]) => (
        <div key={category} className="mb-2">
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-white/40 uppercase tracking-wider">
            {categoryIcons[category]}
            {categoryLabels[category] || category}
          </div>
          
          {Object.entries(families).map(([famKey, family]) => {
            const isExpanded = expanded[`${category}-${famKey}`] !== false;
            return (
              <div key={famKey} className="mb-1">
                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [`${category}-${famKey}`]: !isExpanded,
                    }))
                  }
                  className="w-full flex items-center justify-between px-2 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight
                      className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                    />
                    {family.label}
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pl-6 space-y-0.5">
                    {family.models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => onSelect(model.id)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                          selected === model.id
                            ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <span className="truncate">{model.name}</span>
                        <span className="text-[10px] text-white/30 shrink-0 ml-1">{model.cost}т</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
