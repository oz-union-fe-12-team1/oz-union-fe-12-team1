import { Link } from 'react-router-dom';

export default function ErrorView({ status = 404, homeHref = '/', onRetry }) {
  const is404 = String(status) === '404';
  const title = is404 ? '요청하신 페이지를 찾을 수 없어요.' : '잠시 후 다시 시도해 주세요.';
  const description = is404 ? '주소를 다시 확인해 주세요.' : '계속되면 관리자에게 알려 주세요.';

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-100 p-6">
      <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 shadow-xl p-8 text-center">
        <p className="mb-2 text-sm text-neutral-400">오류 코드 {status}</p>
        <h1 className="text-3xl font-extrabold mb-2">{title}</h1>
        <p className="text-neutral-400 mb-6">{description}</p>

        <div className="flex justify-center gap-3">
          <Link
            to={homeHref}
            className="px-4 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800 transition-colors"
          >
            홈으로 가기
          </Link>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:opacity-90"
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
