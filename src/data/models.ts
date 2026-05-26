export const MODEL_CATALOG = {
  gen_text: {
    openai: {
      label: "OpenAI",
      models: [
        { id: "openai/gpt-5.4", name: "GPT-5.4", cost: 4, description: "Флагманская модель OpenAI. Универсальный интеллект для любых задач." },
        { id: "openai/gpt-4.1", name: "GPT-4.1", cost: 3, description: "Продвинутая модель OpenAI. Отлично пишет код, тексты, анализирует." },
        { id: "openai/gpt-4.1-mini", name: "GPT-4.1 Mini", cost: 2, description: "Лёгкая и быстрая версия GPT-4.1 для повседневных задач." },
        { id: "openai/gpt-4.1-nano", name: "GPT-4.1 Nano", cost: 1, description: "Миниатюрная модель для мгновенных ответов на простые вопросы." },
      ]
    },
    anthropic: {
      label: "Anthropic",
      models: [
        { id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4", cost: 3, description: "Баланс скорости и качества от Anthropic. Лучший выбор для работы." },
        { id: "anthropic/claude-opus-4", name: "Claude Opus 4", cost: 5, description: "Максимальная мощность Anthropic. Для сложнейших аналитических задач." },
      ]
    },
    google: {
      label: "Google",
      models: [
        { id: "google/gemini-3.1-flash", name: "Gemini 3.1 Flash", cost: 1, description: "Молниеносная модель Google для быстрых задач." },
        { id: "google/gemini-3-pro", name: "Gemini 3 Pro", cost: 3, description: "Продвинутый Google-интеллект для глубокого анализа." },
      ]
    },
    deepseek: {
      label: "DeepSeek",
      models: [
        { id: "deepseek/deepseek-v3.1", name: "DeepSeek V3.1", cost: 1, description: "Мощная открытая модель из Китая. Отлично пишет код и рассуждает." },
      ]
    },
    xai: {
      label: "xAI",
      models: [
        { id: "xai/grok-3", name: "Grok 3", cost: 2, description: "Интеллект Илона Маска. Остроумный, прямолинейный, свежий взгляд." },
        { id: "xai/grok-3-mini", name: "Grok 3 Mini", cost: 1, description: "Компактная версия Grok для быстрых ответов." },
      ]
    },
  },
  gen_image: {
    flux: {
      label: "FLUX",
      models: [
        { id: "black-forest-labs/flux-2-pro", name: "FLUX 2 Pro", cost: 6, description: "Премиум фотореализм. Лучшая модель для портретов и сцен." },
        { id: "black-forest-labs/flux-2-flex", name: "FLUX 2 Flex", cost: 4, description: "Гибкая FLUX с балансом скорости и качества." },
      ]
    },
    yandex: {
      label: "Yandex",
      models: [
        { id: "yandex/yandex-art", name: "Yandex Art", cost: 3, description: "Русскоязычная художественная модель от Яндекса." },
      ]
    },
    qwen: {
      label: "Qwen",
      models: [
        { id: "qwen/image-2", name: "Qwen Image 2", cost: 3, description: "Китайская модель с уникальным художественным стилем." },
      ]
    },
  },
  gen_nano_banana: {
    nano: {
      label: "Nano Banana",
      models: [
        { id: "google/gemini-3.1-flash-image-preview", name: "Nano Banana", cost: 2, description: "Мгновенная генерация изображений через Gemini Flash." },
      ]
    }
  },
  gen_video: {
    video_models: {
      label: "Видео",
      models: [
        { id: "bytedance/seedance-2-fast", name: "Seedance 2 Fast", cost: 70, description: "Быстрая видео генерация от ByteDance. 720p/1080p, 5/10/15 сек." },
        { id: "bytedance/seedance-2", name: "Seedance 2", cost: 100, description: "Премиум генерация видео от ByteDance. 720p/1080p, 5/10/15 сек." },
        { id: "kling/v3-motion-control", name: "Kling 3 Motion Control", cost: 35, description: "Перенос движений с референса. 720p/1080p, 5/10/15 сек." },
        { id: "topaz/video-upscale", name: "Топаз Видео Апскейлер", cost: 50, description: "Улучшение и увеличение видео. 720p/1080p, 5/10/15 сек." },
        { id: "wan/2.6", name: "WAN-2.6", cost: 20, description: "Видео генерация из текста. 720p/1080p, 5/10/15 сек." },
        { id: "google/veo3_fast", name: "VEO 3.1 Fast", cost: 30, description: "Быстрая видео генерация от Google. 720p/1080p, 5/10/15 сек." },
        { id: "google/veo3", name: "VEO 3.1 Pro", cost: 35, description: "Премиум видео генерация от Google. 720p/1080p, 5/10/15 сек." },
      ]
    }
  },
  gen_search: {
    perplexity: {
      label: "Perplexity",
      models: [
        { id: "perplexity/sonar-pro-search", name: "Sonar Pro Search", cost: 5, description: "Умнейший ИИ-поисковик. Сам гуглит информацию в реальном времени." },
        { id: "perplexity/sonar-pro", name: "Sonar Pro", cost: 4, description: "Продвинутая поисковая модель Perplexity. Отличный аналитик новостей." },
        { id: "perplexity/sonar-deep-research", name: "Sonar Deep Research", cost: 6, description: "Глубокое исследование темы. Модель изучает десятки сайтов." },
      ]
    }
  }
};

export const ALL_MODELS = Object.values(MODEL_CATALOG).flatMap(
  families => Object.values(families).flatMap(f => f.models)
);

export function getModelById(id: string) {
  return ALL_MODELS.find(m => m.id === id);
}

export function getCategoryByModelId(id: string): string {
  for (const [cat, families] of Object.entries(MODEL_CATALOG)) {
    for (const fam of Object.values(families)) {
      if (fam.models.find(m => m.id === id)) return cat;
    }
  }
  return "gen_text";
}

export const CATEGORY_ICONS: Record<string, string> = {
  gen_text: "🤖",
  gen_image: "🎨",
  gen_nano_banana: "🍌",
  gen_video: "🎥",
  gen_search: "🔍",
};
