export function Login() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <header className="flex h-16 items-center bg-slate-900 px-6 text-white">
        <h1 className="text-lg font-medium"></h1>
      </header>

      <main className="flex-1 bg-slate-100 p-4">
        <div className="grid h-full grid-cols-[3fr_1fr] gap-4">
          <div className="grid grid-rows-[1fr_2fr] gap-4">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="flex items-center justify-center rounded-lg bg-white p-6">
                <span className="text-lg font-medium text-slate-700">뉴스</span>
              </div>
              <div className="flex items-center justify-center rounded-lg bg-white p-6">
                <span className="text-lg font-medium text-slate-700">날씨</span>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-lg bg-white p-6">
              <span className="text-xl font-medium text-slate-700">메인</span>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-lg bg-blue-600 p-6">
            <span className="text-lg font-medium text-white">버튼</span>
          </div>
        </div>
      </main>
    </div>
  );
}
