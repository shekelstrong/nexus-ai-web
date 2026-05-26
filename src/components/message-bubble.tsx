"use client";

import { motion } from "framer-motion";
import { Bot, User, Loader2, Sparkles, ImageIcon, Film, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  modelName?: string;
  isLoading?: boolean;
}

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} max-w-4xl mx-auto`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser
            ? "bg-violet-600"
            : isSystem
            ? "bg-white/10"
            : "bg-gradient-to-br from-violet-500 to-fuchsia-500"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : isSystem ? (
          <Sparkles className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isUser ? "text-right" : ""}`}>
        {!isSystem && message.modelName && (
          <div className="text-[10px] text-white/30 mb-1">{message.modelName}</div>
        )}

        <div
          className={`inline-block text-left rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-violet-600/20 border border-violet-500/20"
              : isSystem
              ? "bg-white/5 border border-white/10 text-white/70"
              : "glass"
          }`}
        >
          {message.isLoading ? (
            <div className="flex items-center gap-2 text-white/50">
              <Loader2 className="w-4 h-4 animate-spin" />
              Генерация...
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {/* Image */}
          {message.imageUrl && (
            <a
              href={message.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 rounded-lg overflow-hidden border border-white/10 hover:border-violet-500/50 transition"
            >
              <img
                src={message.imageUrl}
                alt="Generated"
                className="max-w-full max-h-96 object-contain"
              />
            </a>
          )}

          {/* Video */}
          {message.videoUrl && (
            <div className="mt-2 rounded-lg overflow-hidden border border-white/10">
              <video controls className="max-w-full max-h-96">
                <source src={message.videoUrl} />
              </video>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
