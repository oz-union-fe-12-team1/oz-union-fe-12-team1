// src/components/Mypage/features/MypageMain.jsx
import { useEffect, useRef } from 'react';
import { VscAccount } from 'react-icons/vsc';
import { BiLockAlt } from 'react-icons/bi';
import { MdOutlineMailOutline, MdChevronRight } from 'react-icons/md';
import { useUser } from '../../../store/useUser';
import { useLogout } from '../../../api/auth';

export default function MypageMain({ me, onEdit, onPassword, onContact }) {
  const topRef = useRef(null);
  const { clearUser } = useUser();
  const { logoutMutate } = useLogout();

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        clearUser();
      },
      onError: () => {
        alert('오류');
      },
    });
  };

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

  const itemCls =
    'group relative w-full text-left py-2.5 pl-3 pr-7 rounded-lg ' +
    'hover:bg-white/5 focus:bg-white/5 focus:outline-none ' +
    'transition flex items-center gap-2';
  const iconCls = 'w-4 h-4 text-white/80';
  const arrowCls =
    'absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition';

  return (
    <div ref={topRef} className="space-y-6 text-white">
      <div className="rounded-xl border border-white/10 p-4">
        {/* [회원정보수정] */}
        <div className="text-[11px] font-semibold text-white/60 tracking-wide mb-1">
          [회원정보수정]
        </div>
        <nav className="space-y-1">
          <button type="button" onClick={handleEditClick} className={itemCls}>
            <VscAccount className={iconCls} aria-hidden />
            <span>프로필 변경</span>
            <MdChevronRight className={`${arrowCls} w-4 h-4`} aria-hidden />
          </button>
          <button type="button" onClick={handlePasswordClick} className={itemCls}>
            <BiLockAlt className={iconCls} aria-hidden />
            <span>비밀번호 변경</span>
            <MdChevronRight className={`${arrowCls} w-4 h-4`} aria-hidden />
          </button>
        </nav>

        {/* 구분선 */}
        <div className="my-3 h-px bg-white/10" />

        {/* [문의하기] */}
        <div className="text-[11px] font-semibold text-white/60 tracking-wide mb-1">[문의하기]</div>
        <nav>
          <button type="button" onClick={handleContactClick} className={itemCls}>
            <MdOutlineMailOutline className={iconCls} aria-hidden />
            <span>고객센터</span>
            <MdChevronRight className={`${arrowCls} w-4 h-4`} aria-hidden />
          </button>
        </nav>
      </div>

      {/* 로그아웃 유지 */}
      <div className="flex items-center justify-end">
        <button className="btn text-xs" type="button" onClick={() => handleLogout()}>
          로그아웃
        </button>
      </div>
    </div>
  );
}
