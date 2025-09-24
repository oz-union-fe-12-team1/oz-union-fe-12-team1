export const dummyMorning = {
  type: 'morning',
  summary: `🌅 아침 브리핑
현재 기온은 22도, 습도는 60%로 상쾌한 아침이에요. 오늘은 맑은 날씨라 기분 좋게 하루를 시작하기 좋습니다.
👉 오늘 목표는 “작은 습관 지키기”! 힘내서 출발해볼까요? 🚀`,
};

export const dummyEvening = {
  type: 'evening',
  summary: `🌙 저녁 브리핑
오늘 일정은 총 3개 중 2개를 완료했어요.
내일은 오전 10시에 클라이언트 미팅, 오후엔 문서 제출이 예정돼 있어요.
날씨는 흐리고 비가 올 수 있으니 우산 챙기는 게 좋아요.
오늘도 수고 많으셨습니다. 내일은 더 가볍게 시작해 보죠 ✨`,
};

export const dummyEmpty = {
  type: 'empty',
  summary: '오늘은 등록된 일정과 할 일이 없습니다 😌',
  recommendations: [
    { category: '🧘 건강 & 생활 습관', item: '물 2컵 마시기' },
    { category: '🧘 건강 & 생활 습관', item: '10분 스트레칭하기' },
    { category: '📚 학습 & 자기계발', item: '책 10분 읽기' },
    { category: '💌 관계 & 감정 관리', item: '오늘 기분 한 줄 기록하기' },
  ],
};
