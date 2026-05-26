"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  username?: string;
  firstName?: string;
  photoUrl?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for Telegram WebApp data
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.initData) {
      fetch("/api/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramData: tg.initData }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.user) setUser(data.user);
        })
        .finally(() => setLoading(false));
    } else {
      // Try localStorage fallback
      const saved = localStorage.getItem("nexus_user");
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch {}
      }
      setLoading(false);
    }
  }, []);

  const loginAsGuest = () => {
    const guest = { id: Date.now(), username: "guest", firstName: "Гость" };
    setUser(guest);
    localStorage.setItem("nexus_user", JSON.stringify(guest));
  };

  return { user, loading, loginAsGuest };
}
