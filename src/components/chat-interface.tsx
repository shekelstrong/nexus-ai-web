"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Send,
  Sparkles,
  Loader2,
  Paperclip,
  Mic,
  Wand2,
  Globe,
  Brain,
} from "lucide-react";
import { ALL_MODELS, getCategoryByModelId, MODEL_CATALOG } from "@/data/models";
import { ChatHistorySidebar } from "./chat-history-sidebar";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  modelName?: string;
  isLoading?: boolean;
}

function getModelNameById(id: string): string {
  return ALL_MODELS.find((m) => m.id === id)?.name || id;
}

const TEXT_FAMILIES = MODEL_CATALOG.gen_text;

export default function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState("openai/gpt-5.4");
  const [selectedFamily, setSelectedFamily] = useState("openai");
  const [searchMode, setSearchMode] = useState(false);
  const [sysPromptOpen, setSysPromptOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | undefined>();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "",
      modelName: "Система",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 192) + "px";
    }
  }, [input]);

  const currentModel = ALL_MODELS.find((m) => m.id === selectedModel);
  const currentFamily = TEXT_FAMILIES[selectedFamily as keyof typeof TEXT_FAMILIES];

  const handleSubmit = async () => {
    if (!input.trim() || isGenerating) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      modelName: getModelNameById(selectedModel),
      isLoading: true,
    };

    setMessages((prev) => [...prev.filter((m) => m.id !== "welcome"), userMsg, assistantMsg]);
    setInput("");
    setIsGenerating(true);

    try {
      const category = searchMode ? "gen_search" : getCategoryByModelId(selectedModel);
      const history = [...messages.filter((m) => m.id !== "welcome"), userMsg]
        .filter((m) => m.role !== "system")
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: searchMode ? "perplexity/sonar-pro-search" : selectedModel,
          category,
          prompt: input,
          messages: history,
        }),
      });

      const data = await res.json();

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? {
                ...m,
                isLoading: false,
                content: data.text || data.error || data.message || "Нет ответа",
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
              }
            : m
        )
      );
    } catch (err: any) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, isLoading: false, content: "❌ " + (err.message || "Ошибка сети") }
            : m
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const hasMessages = messages.some((m) => m.id !== "welcome");

  return (
    <div className="flex h-full">
      <ChatHistorySidebar onSelectChat={setActiveChatId} activeChatId={activeChatId} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] glass">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-sm">NexusAI</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchMode((s) => !s)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                searchMode
                  ? "bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff]"
                  : "text-white/40 hover:text-white/70 border border-transparent"
              }`}
            >
              <Globe className="w-3 h-3" />
              {searchMode ? "Веб-поиск ON" : "Веб-поиск"}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
            {!hasMessages ? (
              /* Empty state with model description */
              <div className="flex flex-col items-center justify-center min-h-[40vh] animate-fade-in-up">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
                >
                  {searchMode ? (
                    <Globe className="w-8 h-8 text-white" />
                  ) : (
                    <Brain className="w-8 h-8 text-white" />
                  )}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {searchMode ? "Веб-поиск" : getModelNameById(selectedModel)}
                </div>
                <p className="text-center text-white/50 max-w-md mb-4">
                  {searchMode
                    ? "Модель для задач, где нужен быстрый веб-поиск и анализ информации по ссылкам."
                    : currentModel?.description || "Выберите модель и начните диалог."}
                </p>
                <div className="flex gap-2 flex-wrap justify-center">
                  {["веб-поиск", "анализ ссылок", "актуальные данные", "понимание контекста"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md text-xs text-white/40"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <MessageBubble key={msg.id} message={msg} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div
          className="px-6 pb-6 pt-2"
          style={{ background: "linear-gradient(to top, #0a0a0f, #0a0a0f 95%, transparent)" }}
        >
          <div className="max-w-3xl mx-auto">
            <div
              className="flex items-end gap-2 p-3 rounded-2xl transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <button className="p-2 text-white/40 hover:text-white/80 transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Напишите ваш промпт..."
                disabled={isGenerating}
                className="flex-1 bg-transparent outline-none resize-none text-[15px] leading-6 placeholder:text-white/30 max-h-48 py-1.5"
              />
              <button className="p-2 text-white/40 hover:text-white/80 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isGenerating}
                className="w-9 h-9 rounded-lg flex items-center justify-center btn-ai disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="text-center text-xs text-white/35 mt-2">
              Shift+Enter — новая строка · {currentModel?.cost || 0} кредитов за сообщение
            </div>
          </div>
        </div>
      </div>

      {/* Right panel: Model selector */}
      <div
        className="hidden xl:flex flex-col w-72 shrink-0 h-full border-l border-white/[0.06] overflow-y-auto"
        style={{ background: "rgba(10,10,15,0.6)", backdropFilter: "blur(20px)" }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-sm">Выбор модели</span>
            <button className="text-white/40 hover:text-white/70">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Provider */}
          <div className="mb-3">
            <label className="text-xs text-white/40 mb-1.5 block">Провайдер</label>
            <select
              value={selectedFamily}
              onChange={(e) => {
                const fam = e.target.value;
                setSelectedFamily(fam);
                const firstModel = TEXT_FAMILIES[fam as keyof typeof TEXT_FAMILIES]?.models[0];
                if (firstModel) setSelectedModel(firstModel.id);
                setSearchMode(false);
              }}
              className="w-full px-3 py-2.5 rounded-xl text-sm bg-white/[0.05] border border-white/[0.1] text-white outline-none focus:border-[rgba(124,106,255,0.4)]"
            >
              {Object.entries(TEXT_FAMILIES).map(([key, fam]) => (
                <option key={key} value={key}>{fam.label}</option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div className="mb-3">
            <label className="text-xs text-white/40 mb-1.5 block">Модель</label>
            <select
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setSearchMode(false);
              }}
              className="w-full px-3 py-2.5 rounded-xl text-sm bg-white/[0.05] border border-white/[0.1] text-white outline-none focus:border-[rgba(124,106,255,0.4)]"
            >
              {currentFamily?.models.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          {/* Search toggle */}
          <button
            onClick={() => setSearchMode((s) => !s)}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-all mb-3 ${
              searchMode
                ? "bg-[rgba(0,212,255,0.12)] border border-[rgba(0,212,255,0.3)] text-[#00d4ff]"
                : "bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white"
            }`}
          >
            <Globe className="w-4 h-4" />
            {searchMode ? "Веб-поиск: включён" : "Веб-поиск: выключен"}
          </button>

          {/* System prompt */}
          <div className="mb-3">
            <button
              onClick={() => setSysPromptOpen((o) => !o)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white transition-all"
            >
              <span className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Системный промпт
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${sysPromptOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sysPromptOpen && (
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Введите системный промпт..."
                rows={4}
                className="w-full mt-2 px-3 py-2 rounded-xl text-sm bg-white/[0.05] border border-white/[0.1] text-white placeholder:text-white/30 outline-none focus:border-[rgba(124,106,255,0.4)] resize-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div
          className="max-w-[75%] px-4 py-3 rounded-2xl rounded-br-sm text-[15px] leading-relaxed"
          style={{
            background: "linear-gradient(135deg, rgba(124,106,255,0.18), rgba(124,106,255,0.08))",
            border: "1px solid rgba(124,106,255,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-fade-in-up">
      <div
        className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
      >
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="max-w-[78%]">
        {message.modelName && message.id !== "welcome" && (
          <div
            className="inline-flex items-center gap-1 px-2 py-0.5 mb-2 rounded text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: "rgba(124,106,255,0.1)",
              border: "1px solid rgba(124,106,255,0.2)",
              color: "#7c6aff",
            }}
          >
            {message.modelName}
          </div>
        )}
        {message.isLoading ? (
          <div className="glass-panel px-5 py-4 rounded-2xl rounded-tl-sm">
            <div className="loading-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        ) : (
          <div
            className="px-5 py-4 rounded-2xl rounded-tl-sm text-[15px] leading-relaxed whitespace-pre-wrap"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            {message.imageUrl && (
              <img src={message.imageUrl} alt="Generated" className="rounded-lg mt-2 max-w-full" />
            )}
            {message.videoUrl && (
              <video src={message.videoUrl} controls className="rounded-lg mt-2 max-w-full" />
            )}
            {message.content}
          </div>
        )}
      </div>
    </div>
  );
}
