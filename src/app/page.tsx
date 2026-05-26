import ChatInterface from "@/components/chat-interface";
import { AmbientBackground } from "@/components/ambient-background";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <main className="flex h-screen w-full overflow-hidden relative">
        <ChatInterface />
      </main>
    </>
  );
}
