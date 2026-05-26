"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Zap, Coins } from "lucide-react";
import Link from "next/link";

const PACKAGES = [
  { tokens: 500, price: 150, label: "Стартовый" },
  { tokens: 2000, price: 500, label: "Популярный", popular: true },
  { tokens: 5000, price: 1000, label: "Профи" },
  { tokens: 15000, price: 2500, label: "Безлимит" },
];

export default function PayPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePay = async (pkg: typeof PACKAGES[0]) => {
    setLoading(pkg.label);
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: pkg.price,
          description: `Nexus AI — ${pkg.label} (${pkg.tokens} токенов)`,
        }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      alert("Ошибка создания платежа");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="p-2 rounded-lg hover:bg-white/10 transition">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold gradient-text">Пополнение баланса</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.label}
              whileHover={{ scale: 1.02 }}
              className={`glass rounded-2xl p-6 flex flex-col ${
                pkg.popular ? "border-violet-500/40 glow-violet" : ""
              }`}
            >
              {pkg.popular && (
                <div className="text-xs font-bold text-violet-300 mb-2">⭐ ПОПУЛЯРНЫЙ</div>
              )}
              <div className="text-3xl font-bold mb-1">{pkg.tokens}</div>
              <div className="text-sm text-white/50 mb-4">токенов</div>
              <div className="text-2xl font-bold gradient-text mb-4">{pkg.price} ₽</div>
              <button
                onClick={() => handlePay(pkg)}
                disabled={loading === pkg.label}
                className="mt-auto w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {loading === pkg.label ? "..." : "Оплатить"}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Coins className="w-5 h-5 text-violet-400" />
            Информация о токенах
          </h2>
          <div className="space-y-2 text-sm text-white/60">
            <p>🤖 Текст (GPT-5.4): ~4 токена за запрос</p>
            <p>🎨 Изображения (FLUX): ~6 токенов за генерацию</p>
            <p>🍌 Nano Banana: ~2 токена за изображение</p>
            <p>🎥 Видео (Seedance): ~70-100 токенов за видео</p>
            <p>🔍 Поиск (Perplexity): ~5 токенов за запрос</p>
          </div>
        </div>
      </div>
    </div>
  );
}
