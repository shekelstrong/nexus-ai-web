import { AppLayout } from "@/components/app-layout";
import {
  User,
  Wallet,
  Zap,
  TrendingUp,
  Award,
  Link,
  Clock,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="h-full overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold mb-6">Профиль</h1>

          {/* Profile card */}
          <div className="glass-panel p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7c6aff, #00d4ff)" }}
              >
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-lg font-semibold">Гость</div>
                <div className="text-sm text-white/50">@nedopekin</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-lg btn-ai text-sm font-medium">
                Привязать Telegram
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-4 h-4 text-[color:var(--color-accent-secondary)]" />
                <span className="text-sm text-white/50">Баланс</span>
              </div>
              <div className="text-2xl font-bold">1 250 кредитов</div>
            </div>
            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[color:var(--color-accent-tertiary)]" />
                <span className="text-sm text-white/50">Тариф</span>
              </div>
              <div className="text-2xl font-bold text-[color:var(--color-accent-tertiary)]">FREE</div>
            </div>
          </div>

          {/* Referrals */}
          <div className="glass-panel p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Link className="w-4 h-4 text-[color:var(--color-accent-primary)]" />
              <span className="font-semibold">Рефералы</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">0</div>
                <div className="text-xs text-white/40 mt-1">Партнерские токены</div>
              </div>
              <div>
                <div className="text-xl font-bold">0</div>
                <div className="text-xs text-white/40 mt-1">Всего продаж</div>
              </div>
              <div>
                <div className="text-xl font-bold">$0</div>
                <div className="text-xs text-white/40 mt-1">Сумма продаж</div>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-[color:var(--color-accent-secondary)]" />
              <span className="font-semibold">История токенов</span>
            </div>
            <div className="text-center text-white/30 py-8">
              История пока пуста. Начните использовать модели.
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
