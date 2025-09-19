import { todayFortuneDummy } from '../api/fortune';

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
    <div className="flex flex-col gap-4 text-slate-800">
      <h2 className="text-xl font-bold">오늘의 운세</h2>
      <p className="text-sm text-slate-500">생일: {birthday}</p>

      {Object.entries(fortune).map(([key, value]) => (
        <div key={key}>
          <span className="font-semibold">{labels[key]}</span>
          <p>{value}</p>
        </div>
      ))}

      <p className="text-xs text-slate-400">업데이트: {created_at}</p>
    </div>
  );
}
