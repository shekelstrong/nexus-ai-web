# 🌌 Nexus AI Web

Модный веб-интерфейс для генерации ИИ-контента. Зеркало Telegram-бота **nexus_ai_bot**.

## ✨ Возможности

- 🤖 **Текст** — GPT-5.4, Claude Sonnet 4, Gemini 3 Pro, DeepSeek, Grok 3
- 🎨 **Изображения** — FLUX 2 Pro, Yandex Art, Qwen Image
- 🍌 **Nano Banana** — мгновенная генерация через Gemini Flash
- 🎥 **Видео** — Seedance, VEO 3.1, WAN-2.6, Kling 3
- 🔍 **Поиск** — Perplexity Sonar Pro, Deep Research
- 💰 **Платежи** — интеграция с Platega (тот же webhook, что и в боте)

## 🏗 Архитектура

```
Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
├── src/app/api/generate/route.ts     # Прокси для Polza AI / OpenRouter
├── src/app/api/payment/create.ts     # Создание платежа через Platega
├── src/app/api/webhook/platega.ts    # Webhook для платежей (пересылает в бот)
├── src/app/api/auth/telegram.ts     # Авторизация через Telegram WebApp
├── src/components/chat-interface.tsx  # Главный чат с боковой панелью
├── src/components/model-selector.tsx # Выбор моделей (категории + семейства)
├── src/data/models.ts                # Каталог моделей (зеркало бота)
```

## 🚀 Деплой на Vercel

1. **Импортируй репозиторий** на [vercel.com](https://vercel.com)
2. **Добавь Environment Variables:**
   - `POLZA_AI_API_KEY` — ключ Polza AI
   - `OPENROUTER_API_KEY` — ключ OpenRouter (fallback)
   - `PLATEGA_API_KEY` — ключ платёжной системы
   - `PLATEGA_WEBHOOK_SECRET` — секрет для webhook подписи
   - `BOT_WEBHOOK_URL` — URL бота для пересылки платежей
   - `NEXT_PUBLIC_APP_URL` — URL сайта (для редиректов)
3. **Deploy**

## 🔗 Связь с ботом

- **Единый каталог моделей** — обновления моделей в боте автоматически отражаются на сайте (нужен ручной sync `model_config.py` → `src/data/models.ts`)
- **Единый контекст** — история сообщений сохраняется при переключении между моделями
- **Единый баланс** — пополнение через Platega на сайте обновляет баланс в боте (через webhook)

## 🛠 Локальная разработка

```bash
cd nexus-ai-web
npm install
npm run dev
```

## 📦 Стек

- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui
- Framer Motion (анимации)
- react-markdown (рендеринг ответов)
- lucide-react (иконки)

---

Built with 💜 by Nexus AI Team
