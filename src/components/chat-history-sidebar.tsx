"use client";

import { useState } from "react";
import { Plus, Search, MessageSquare, Folder, Trash2, ChevronDown } from "lucide-react";
import { ALL_MODELS } from "@/data/models";

interface ChatSession {
  id: string;
  title: string;
  modelId: string;
  updatedAt: string;
  messages: number;
}

const demoChats: ChatSession[] = [
  { id: "1", title: "Разработка API", modelId: "openai/gpt-5.4", updatedAt: "14:32", messages: 12 },
  { id: "2", title: "Анализ данных", modelId: "anthropic/claude-sonnet-4", updatedAt: "Вчера", messages: 8 },
  { id: "3", title: "Дизайн лендинга", modelId: "black-forest-labs/flux-2-pro", updatedAt: "Вчера", messages: 5 },
];

interface Props {
  onSelectChat: (id: string) => void;
  activeChatId?: string;
}

export function ChatHistorySidebar({ onSelectChat, activeChatId }: Props) {
  const [tab, setTab] = useState<"chats" | "projects">("chats");
  const [search, setSearch] = useState("");

  const filtered = demoChats.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-64 shrink-0 border-r border-white/[0.06]"
      style={{ background: "rgba(10,10,15,0.6)", backdropFilter: "blur(20px)" }}
    >
      {/* New chat */}
      <div className="p-3">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:-translate-y-px btn-ai">
          <Plus className="w-4 h-4" />
          Новый чат
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Search className="w-4 h-4 text-white/40" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск чатов..."
            className="bg-transparent outline-none flex-1 placeholder:text-white/30 text-sm text-white/80"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-3 gap-1 mb-2">
        <button
          onClick={() => setTab("chats")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            tab === "chats" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
          Чаты
        </button>
        <button
          onClick={() => setTab("projects")}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            tab === "projects" ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/70"
          }`}
        >
          <Folder className="w-3.5 h-3.5 inline mr-1" />
          Проекты
        </button>
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {filtered.map((chat) => {
          const model = ALL_MODELS.find((m) => m.id === chat.modelId);
          const isActive = chat.id === activeChatId;
          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full text-left p-2.5 rounded-xl text-sm transition-all group ${
                isActive
                  ? "bg-[rgba(124,106,255,0.12)] border border-[rgba(124,106,255,0.25)]"
                  : "hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{chat.title}</div>
                  <div className="text-xs text-white/40 truncate">
                    {model?.name || chat.modelId} · {chat.messages} сообщ.
                  </div>
                </div>
                <Trash2 className="w-3.5 h-3.5 text-white/20 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all shrink-0" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
