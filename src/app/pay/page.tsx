import { AppLayout } from "@/components/app-layout";
import Link from "next/link";

export default function PayPage() {
  return (
    <AppLayout>
      <div className="h-full flex items-center justify-center">
        <div className="glass-panel p-8 max-w-md w-full text-center">
          <div className="text-lg font-semibold mb-2">Пополнение кредитов</div>
          <p className="text-white/50 mb-6">
            Для пополнения баланса перейдите на страницу тарифов.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-2.5 rounded-lg btn-ai text-sm font-medium"
          >
            Перейти к тарифам
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
