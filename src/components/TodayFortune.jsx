export default function TodayFortune() {
  return (
    <div className="flex flex-col gap-3 text-slate-800">
      <h2 className="text-xl font-bold">오늘의 운세</h2>
      <p className="text-sm text-slate-500">생일: 1997-09-30</p>

      <div>
        <span className="font-semibold">🌟 전체 운세</span>
        <p>
          에너지 흐름이 부드럽고 조화로운 날이에요. 자신감이 붙고 작은 일도 잘 풀리는 기운이
          따릅니다.
        </p>
      </div>

      <div>
        <span className="font-semibold">📚 일/학업</span>
        <p>집중력이 필요한 일은 오전에 처리하는 게 효율적이에요.</p>
      </div>

      <div>
        <span className="font-semibold">💰 금전</span>
        <p>충동구매에 주의하세요. 작은 지출도 쌓이면 부담이 될 수 있습니다.</p>
      </div>

      <div>
        <span className="font-semibold">💕 연애</span>
        <p>오늘은 솔직한 대화가 좋은 결과를 가져다줄 거예요.</p>
      </div>

      <div>
        <span className="font-semibold">🩺 건강</span>
        <p>큰 문제는 없지만, 긴장성 두통이나 어깨 결림에 주의하세요.</p>
      </div>

      <div>
        <span className="font-semibold">✨ 오늘의 한마디</span>
        <p>작은 습관이 큰 기쁨을 만듭니다. 오늘은 일과 배트로 몸과 마음을 다져보세요!</p>
      </div>

      <p className="text-xs text-slate-400">업데이트: 2025-09-17 10:30</p>
    </div>
  );
}
