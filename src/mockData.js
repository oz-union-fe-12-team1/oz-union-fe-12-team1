// ---- 더미 데이터 ----
let _me = {
  id: 1,
  email: 'user@example.com',
  username: '하리보',
  profile_image: '',
  birthdate: '',
  created_at: '2025-01-01T00:00:00Z',
  settings: {
    language: 'ko',
    date_format: 'YYYY-MM-DD',
    time_format: '24h',
    default_location_lat: 37.5665,
    default_location_lon: 126.978,
    location_name: 'Seoul',
  },
};

// ---- 더미 API 흉내 ----
export async function getMeMock() {
  return JSON.parse(JSON.stringify(_me));
}

export async function updateMeMock(payload = {}) {
  // 부분 업데이트: 전달된 키만 반영
  const next = { ..._me };

  if ('birthdate' in payload) {
    const b = payload.birthdate;
    // 허용 정책 1) 빈 값 허용
    // - 값이 있을 때만 형식 검증
    if (b && !/^\d{4}-\d{2}-\d{2}$/.test(b)) {
      throw new Error('birthdate must be YYYY-MM-DD');
    }
    next.birthdate = b ?? ''; // null/undefined면 빈 문자열로
  }

  if ('username' in payload) {
    next.username = String(payload.username ?? '');
  }

  if ('profile_image' in payload) {
    next.profile_image = payload.profile_image ?? '';
  }

  if ('settings' in payload && typeof payload.settings === 'object' && payload.settings) {
    next.settings = { ...next.settings, ...payload.settings };
  }

  _me = next;
  return JSON.parse(JSON.stringify(_me));
}
