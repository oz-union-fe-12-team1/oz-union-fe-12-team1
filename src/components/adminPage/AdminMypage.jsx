import { useOpenAdminPage } from '../../store/useOpenAdminPage';
import PinkCard from '../Mypage/common/PinkCard';
import Button from '../ui/Button';
import { useOpenAdminDashboard } from '../../store/useOpenAdminDashboard';
import Contact from '../Mypage/Contact/Contact';
import { useState } from 'react';
import { useTicketsStore } from '../../store/useTicketsStore';
import { useMainPage } from '../../store/useMainPage';
import { useUser } from '../../store/useUser';
import { useLogout } from '../../api/auth';

export default function AdminMypage() {
  const { openAdminPage, setOpenAdminPage } = useOpenAdminPage();
  const { openAdminDashboard, setOpenAdminDashboard } = useOpenAdminDashboard();

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

  const [contactOpen, setContactOpen] = useState(false);
  const [contactTab, setContactTab] = useState('reply');
  const [expandedId, setExpandedId] = useState(null);
  const { tickets, setTickets } = useTicketsStore();
  const { setPageMode } = useMainPage();

  const handleBackToMain = () => setPageMode('main');

  return (
    <>
      <PinkCard open={openAdminPage} onClose={() => setOpenAdminPage(false)}>
        <button
          className="ml-auto text-white/80 hover:text-gray-500 text-xl"
          onClick={() => {
            setOpenAdminPage(false);
            setOpenAdminDashboard(false);
            handleBackToMain();
          }}
          aria-label="close"
        >
          ✕
        </button>
        <div className="flex flex-col justify-start h-full gap-15">
          <div className="flex flex-col gap-10 w-full items-center  border-b pb-10">
            <img
              className="mt-2 w-20 h-20 border rounded-[50%] border-gray-600 aspect-[1/1]"
              src="/images/nyangbiseo-sunglasses.png"
              alt="관리자 아바타" //추가
            />
            <p className="text-[1.2rem]">관리자님 ㅎㅇ?</p>
          </div>

          <Button
            size="lgfree"
            variant="common"
            onClick={() => {
              setOpenAdminDashboard(!openAdminDashboard);
              if (openAdminDashboard) {
                setPageMode('main');
              } else {
                setPageMode('admin');
              }
            }}
          >
            {openAdminDashboard ? <p>숨기기</p> : <p>유저 목록</p>}
          </Button>

          <Button
            size="lgfree"
            variant="common"
            onClick={() => {
              setContactTab('reply'); // 관리자 전용 탭으로 진입
              setContactOpen(true); // 모달 열기
            }}
          >
            답변함
          </Button>
        </div>

        <button
          className="hover:underline"
          onClick={() => {
            handleLogout();
            // localStorage.removeItem('accessToken');
            // setOpenAdminPage(false);
            // navigate('/');
            // 나중에 로그인 기능 생기면.. 로그아웃 했을 때 토큰이 없으면 "/"으로 가게 될 거라서 그냥 토큰 삭제만 하면 됨.
          }}
        >
          로그아웃
        </button>
      </PinkCard>

      <Contact
        open={contactOpen}
        tab={contactTab}
        setTab={setContactTab}
        onClose={() => {
          setContactOpen(false);
          setExpandedId(null);
        }}
        tickets={tickets}
        setTickets={setTickets}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        isAdmin={true} // ★ 관리자 전용 탭(답변함) 표시
        adminOnlyReply={true} // ★ 관리자 전용 모드 (문의하기 탭 숨김)
      />
    </>
  );
}
