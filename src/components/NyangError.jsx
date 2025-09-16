import React from 'react';

export default function NyangErrorSimple({
  status = 404,
  imgSrc = '/images/nyangbiseo-cry.png',
  homeHref = '/',
  onRetry,
}) {
  const is404 = String(status) === '404';
  const title = is404 ? '길을 잃었어요' : '문제가 발생했어요';
  const description = is404
    ? '요청하신 페이지를 찾을 수 없어요. 주소를 다시 확인해 주세요.'
    : '잠시 후 다시 시도해 주세요. 계속되면 관리자에게 알려 주세요.';

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-md">
        {/* 상단바 */}
        <div className="h-3 rounded-t-2xl bg-slate-900" />

        <div className="p-8">
          {/* 이미지 */}
          <div className="flex justify-center">
            <img
              src={imgSrc}
              alt="냥비서"
              className="h-40 w-40 object-contain select-none"
              draggable={false}
            />
          </div>

          {/* 텍스트 */}
          <div className="mt-5 text-center">
            <p className="mb-1 text-sm text-slate-500">오류 코드 {status}</p>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="mt-2 text-slate-600">{description}</p>
          </div>

          {/* 버튼들 */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={homeHref}
              className="rounded-xl border border-slate-300 px-4 py-2 text-slate-800 hover:bg-slate-50"
            >
              홈으로 가기
            </a>
            {onRetry && (
              <button
                onClick={onRetry}
                className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:opacity-90"
              >
                다시 시도
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
