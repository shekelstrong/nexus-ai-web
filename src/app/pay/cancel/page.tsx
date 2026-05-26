export default function PayCancel() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold mb-2">Платеж отменён</h1>
        <p className="text-white/60 mb-6">Ничего не списано. Попробуйте снова.</p>
        <a href="/pay" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition inline-block">
          Выбрать пакет
        </a>
      </div>
    </div>
  );
}
