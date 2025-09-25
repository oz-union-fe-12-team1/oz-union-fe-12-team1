export default function LoadingView({
  fullscreen = true,
  label = '정보를 모으는 중...',
  tip = '잠시만 기다려 주세요.',
}) {
  const containerClass = fullscreen
    ? 'flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-100 p-6'
    : 'flex items-center justify-center bg-neutral-900 text-neutral-100 p-6 rounded-2xl border border-neutral-800';

  return (
    <div className={containerClass} role="status" aria-live="polite">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-blue-500" />
        </div>

        <h1 className="text-2xl font-extrabold mb-2">{label}</h1>
        {tip && <p className="text-neutral-400">{tip}</p>}
      </div>
    </div>
  );
}
