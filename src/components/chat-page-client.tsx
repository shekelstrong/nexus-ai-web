"use client";

import { useState } from "react";
import { ChatHistorySidebar } from "@/components/chat-history-sidebar";
import ChatInterface from "@/components/chat-interface";

export default function ChatPageClient() {
  const [activeChatId, setActiveChatId] = useState<string | undefined>();

  return (
    <div className="flex h-full">
      <ChatHistorySidebar onSelectChat={setActiveChatId} activeChatId={activeChatId} />
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}
