export default function PaySuccess() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold gradient-text mb-2">Платеж успешен!</h1>
        <p className="text-white/60 mb-6">Токены начислены на ваш баланс. Возвращайтесь в бота или на сайт.</p>
        <a href="/" className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition inline-block">
          Вернуться в чат
        </a>
      </div>
    </div>
  );
}
