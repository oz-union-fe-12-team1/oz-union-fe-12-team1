// src/components/Mypage/features/MypageMain.jsx
import { useEffect, useRef } from 'react';

export default function MypageMain({ me, onEdit, onPassword, onContact, onLogout }) {
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current && topRef.current.scrollIntoView) {
      topRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  if (!me) {
    return <div className="p-4 text-white">불러오는 중…</div>;
  }

  function handleContactClick() {
    if (typeof onContact === 'function') onContact();
  }
  function handleEditClick() {
    if (typeof onEdit === 'function') onEdit();
  }
  function handlePasswordClick() {
    if (typeof onPassword === 'function') onPassword();
  }
  function handleLogoutClick() {
    if (typeof onLogout === 'function') onLogout();
  }

  return (
    <div ref={topRef} className="space-y-6 text-white">
      {/* 고객센터 카드 */}
      <div className="rounded-xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">도움이 필요하신가요?</div>
            <div className="text-sm text-neutral-300">고객센터로 문의하실 수 있어요.</div>
          </div>
          <button className="btn" type="button" onClick={handleContactClick}>
            고객센터
          </button>
        </div>
      </div>

      {/* 프로필 수정 안내 */}
      <div className="rounded-xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">프로필을 변경하고싶으신가요?</div>
            <div className="text-sm text-neutral-300">
              닉네임, 생년월일, 이미지 등을 수정할 수 있어요.
            </div>
          </div>
          <button className="btn" type="button" onClick={handleEditClick}>
            회원정보 수정
          </button>
        </div>
      </div>

      {/* 비밀번호 변경 안내 */}
      <div className="rounded-xl border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">비밀번호를 변경하고싶으신가요?</div>
            <div className="text-sm text-neutral-300">
              현재 비밀번호와 새 비밀번호로 변경할 수 있어요.
            </div>
          </div>
          <button className="btn" type="button" onClick={handlePasswordClick}>
            비밀번호 변경
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button className="btn" type="button" onClick={handleLogoutClick}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
