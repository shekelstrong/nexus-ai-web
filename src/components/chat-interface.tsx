"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image, Video, Loader2, Bot, User, Sparkles, Zap } from "lucide-react";
import ModelSelector from "./model-selector";
import MessageBubble from "./message-bubble";
import { MODEL_CATALOG, getCategoryByModelId, ALL_MODELS } from "@/data/models";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  modelId?: string;
  modelName?: string;
  isLoading?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content:
        "👋 Добро пожаловать в **Nexus AI**!\n\nВыберите модель в боковой панели и начните генерацию. Контекст сохраняется при переключении между моделями.",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("openai/gpt-5.4");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, [input]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
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
      modelId: selectedModel,
      modelName: ALL_MODELS.find((m) => m.id === selectedModel)?.name || selectedModel,
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsGenerating(true);

    try {
      const category = getCategoryByModelId(selectedModel);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          category,
          prompt: input,
          messages: [...messages, userMsg].map((m) => ({
            role: m.role === "system" ? "system" : m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? {
                ...m,
                isLoading: false,
                content: data.text || data.error || "Нет ответа",
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
              }
            : m
        )
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, isLoading: false, content: "❌ Ошибка сети. Попробуйте снова." }
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

  return (
    <div className="flex h-screen w-full bg-[#0a0a0f]">
      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 glass border-r border-white/10 flex flex-col overflow-y-auto"
          >
            <div className="p-4 border-b border-white/10">
              <h1 className="text-xl font-bold gradient-text flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Nexus AI
              </h1>
              <p className="text-xs text-white/50 mt-1">Мощнейший ИИ-интерфейс</p>
            </div>

            <ModelSelector
              selected={selectedModel}
              onSelect={(id) => {
                setSelectedModel(id);
                const model = ALL_MODELS.find((m) => m.id === id);
                setMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    role: "system",
                    content: `🔄 **Модель переключена:** ${model?.name || id}\n\nКонтекст сохранён. Продолжайте диалог.`,
                  },
                ]);
              }}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 glass border-b border-white/10 flex items-center px-4 gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Zap className="w-5 h-5 text-violet-400" />
          </button>
          <div className="flex-1">
            <div className="text-sm font-medium">
              {ALL_MODELS.find((m) => m.id === selectedModel)?.name || selectedModel}
            </div>
            <div className="text-xs text-white/40">
              {ALL_MODELS.find((m) => m.id === selectedModel)?.description}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {getCategoryByModelId(selectedModel).replace("gen_", "")}
            </span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 glass border-t border-white/10">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-white/5 border border-white/10 rounded-xl p-2 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/20 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Напишите промпт... (Shift+Enter для новой строки)"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 resize-none outline-none min-h-[40px] max-h-[200px] py-2 px-2"
                rows={1}
                disabled={isGenerating}
              />
              <button
                type="submit"
                disabled={isGenerating || !input.trim()}
                className="p-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-white/30">
              <span>Nexus AI Web — синхронизировано с ботом</span>
              <span className="flex items-center gap-1">
                <Bot className="w-3 h-3" /> Полный контекст сохраняется
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
