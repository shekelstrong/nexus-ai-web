"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Send, Sparkles, Loader2, Paperclip, Mic } from "lucide-react";
import { ALL_MODELS, getCategoryByModelId } from "@/data/models";

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
  const model = ALL_MODELS.find((m) => m.id === id);
  return model?.name || id;
}

export default function ChatInterface() {
  const [selectedModel, setSelectedModel] = useState("openai/gpt-5.4");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Добро пожаловать в **NexusAI**!\n\nВыберите модель и начните генерацию. Контекст сохраняется при переключении.",
      modelName: "Система",
    },
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
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
      el.style.height = Math.min(el.scrollHeight, 192) + "px";
    }
  }, [input]);

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

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsGenerating(true);

    try {
      const category = getCategoryByModelId(selectedModel);
      const history = [...messages, userMsg].filter((m) => m.role !== "system").map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
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

  const modelList = ALL_MODELS;

  return (
    <div className="flex flex-col h-screen w-full relative">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.06] glass">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">NexusAI</span>
        </div>

        {/* Model selector dropdown */}
        <div className="relative">
          <button
            onClick={() => setModelDropdownOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm glass-panel glass-panel-hover"
          >
            <Sparkles className="w-3.5 h-3.5 text-[color:var(--color-accent-primary)]" />
            <span className="font-medium">{getModelNameById(selectedModel)}</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
          </button>

          {modelDropdownOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 p-2 rounded-xl z-50"
              style={{
                background: "rgba(18,18,26,0.96)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {modelList.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m.id);
                    setModelDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 p-3 rounded-lg text-left transition-colors text-sm ${
                    m.id === selectedModel
                      ? "bg-[rgba(124,106,255,0.12)] border border-[rgba(124,106,255,0.25)]"
                      : "hover:bg-white/[0.05] border border-transparent"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{m.name}</div>
                    <div className="text-xs text-white/45 truncate">{m.description?.substring(0, 55) || ""}</div>
                  </div>
                  <span
                    className="text-xs font-medium shrink-0"
                    style={{ color: "var(--color-accent-secondary)" }}
                  >
                    {m.cost} cr
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
          {messages.map((msg, i) => (
            <MessageBubble key={msg.id} message={msg} isFirst={i === 0} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-6 pb-6 pt-2" style={{ background: "linear-gradient(to top, #0a0a0f, #0a0a0f 95%, transparent)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-2 p-3 rounded-2xl transition-all"
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
              placeholder="Спросите что-нибудь..."
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
            Shift+Enter — новая строка · {ALL_MODELS.find((m) => m.id === selectedModel)?.cost || 0} кредитов за сообщение
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  isFirst,
}: {
  message: Message;
  isFirst: boolean;
}) {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

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

  if (isAssistant || message.role === "system") {
    return (
      <div className="flex gap-3 animate-fade-in-up">
        <div
          className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
        >
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="max-w-[78%]">
          {message.modelName && (
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

  return null;
}
