import React from 'react';

export default function NyangLoading({
  fullscreen = true,
  imgSrc = '/images/nyangbiseo-loading.png',
  label = '냥비서가 정보를 모으는 중...',
  tip,
  showProgress = false,
  progress = 60,
}) {
  const containerClass = fullscreen
    ? 'min-h-screen flex items-center justify-center bg-slate-50 p-6'
    : 'flex items-center justify-center bg-white p-6 rounded-2xl border border-slate-200';

  return (
    <div className={containerClass} role="status" aria-live="polite">
      {/* 404/500 페이지와 동일한 박스 사이즈로 통일 (max-w-xl, p-8) */}
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white shadow-md">
        {/* 상단 바 */}
        <div className="h-3 rounded-t-2xl bg-slate-900" />

        <div className="p-8">
          {/* 마스코트 + 로딩 스피너 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={imgSrc}
                alt="냥비서"
                className="h-36 w-36 object-contain select-none"
                draggable={false}
              />
              {/* 이미지 아래쪽 작은 스피너 */}
              <div className="absolute -bottom-3 left-1/2 h-7 w-7 -translate-x-1/2 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
            </div>

            {/* 안내 문구 */}
            <p className="mt-6 text-center text-lg font-semibold text-slate-800">
              {label}
            </p>
            {tip && (
              <p className="mt-2 text-center text-sm text-slate-500">{tip}</p>
            )}

            {/* 진행률 바 */}
            {showProgress && (
              <div className="mt-6 w-full">
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{
                      width: `${Math.min(Math.max(progress, 0), 100)}%`,
                    }}
                    aria-label="로딩 진행률"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.min(Math.max(progress, 0), 100)}
                    role="progressbar"
                  />
                </div>
                <div className="mt-1 text-right text-xs text-slate-500">
                  {Math.min(Math.max(progress, 0), 100)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
