import { todayFortuneDummy } from '../api/dummyData/dummyFortune';

export default function TodayFortune() {
  const { birthday, fortune, created_at } = todayFortuneDummy.data;

  const labels = {
    general: '🌟 전체 운세',
    study: '📚 일/학업',
    money: '💰 금전',
    love: '💕 연애',
    health: '🩺 건강',
    advice: '✨ 오늘의 한 줄 조언',
  };

  return (
    <div className="flex flex-col gap-4 h-full min-h-0 text-neutral-100">
      <div>
        <p className="text-xs text-neutral-400">생일: {birthday}</p>
      </div>

      <div className="flex-1 min-h-0 overflow-auto custom-scroll rounded-xl bg-neutral-900/60 border border-neutral-700 p-5 space-y-4">
        {Object.entries(fortune).map(([key, value]) => (
          <div key={key}>
            <span className="block font-semibold text-blue-400 mb-1">{labels[key]}</span>
            <p className="text-sm leading-relaxed text-neutral-200">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-neutral-500 text-right">
        업데이트: {new Date(created_at).toLocaleString('ko-KR')}
      </p>
    </div>
  );
}
