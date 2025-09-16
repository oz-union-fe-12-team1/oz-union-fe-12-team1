// src/mockData.js

// ---- 더미 데이터 (한곳에 몰아둠) ----
let _me = {
    id: 1,
    email: 'user@example.com',
    username: '하리보',
    profile_image: 'https://example.com/profile.png',
    birthdate: '1995-08-15', // YYYY-MM-DD (필수)
    created_at: '2025-01-01T00:00:00Z',
    settings: {
        language: 'ko',
        date_format: 'YYYY-MM-DD',
        time_format: '24h',
        default_location_lat: 37.5665,
        default_location_lon: 126.9780,
        location_name: 'Seoul',
    },
};

// ---- 더미 API 흉내 ----
export async function getMeMock() {
    // structuredClone 대용: JSON trick (간단 더미라 충분)
    return JSON.parse(JSON.stringify(_me));
}

export async function updateMeMock(payload) {
    if (!payload || typeof payload.birthdate !== 'string') {
        throw new Error('birthdate is required (YYYY-MM-DD)');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.birthdate)) {
        throw new Error('birthdate must be YYYY-MM-DD');
    }
    _me = { ..._me, ...payload };
    return JSON.parse(JSON.stringify(_me));
}
