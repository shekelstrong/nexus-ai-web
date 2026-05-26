import { AppLayout } from "@/components/app-layout";
import Link from "next/link";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Basic",
    tokens: 3120,
    price: "$19",
    features: [
      "Создавайте до 516 видео",
      "Генерируйте до 10 404 изображений",
      "Работайте с текстами (10 запросов/час)",
      "Безлимит Stable diffusion",
    ],
    popular: false,
  },
  {
    name: "Pro",
    tokens: 8160,
    price: "$49",
    features: [
      "Всё из Basic",
      "Создавайте GPT агентов",
      "Улучшайте качество видео (Topaz)",
      "Безлимит Gemini 2.5 flash",
      "Безлимит GPT 5 mini",
    ],
    popular: true,
  },
  {
    name: "VIP",
    tokens: 20400,
    price: "$99",
    features: [
      "Всё из Pro",
      "Безлимит в 30 языковых моделях",
      "GPT-5, Claude Opus 4, Grok 4",
      "Безлимит видео генерация",
      "Приоритетная обработка",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <AppLayout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-2">Тарифы</h1>
          <p className="text-center text-white/50 mb-8">
            Выберите подходящий пакет для ваших задач
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass-panel p-6 relative ${
                  plan.popular ? "border-[rgba(124,106,255,0.4)]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "linear-gradient(135deg, #7c6aff, #ff6b9d)",
                        color: "#fff",
                      }}
                    >
                      <Star className="w-3 h-3" />
                      ТОП ВЫБОР
                    </div>
                  </div>
                )}

                <div className="text-4xl font-bold mb-1 text-gradient-ai">
                  {plan.name}
                </div>
                <div className="text-sm text-white/40 mb-4">
                  {plan.tokens.toLocaleString()} токенов
                </div>

                <div className="text-3xl font-bold mb-6">{plan.price}</div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[color:var(--color-accent-secondary)] shrink-0 mt-0.5" />
                      <span className="text-white/70">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/api/payment/create"
                  className={`block text-center py-2.5 rounded-xl text-sm font-medium transition-all ${
                    plan.popular
                      ? "btn-ai"
                      : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/10"
                  }`}
                >
                  Купить {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
