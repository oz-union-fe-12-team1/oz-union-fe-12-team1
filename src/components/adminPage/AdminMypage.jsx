import { useNavigate } from 'react-router-dom';
import { useOpenAdminPage } from '../../store/useOpenAdminPage';
import PinkCard from '../Mypage/common/PinkCard';
import Button from '../ui/Button';
import { useOpenAdminDashboard } from '../../store/useOpenAdminDashboard';
import Contact from '../Mypage/Contact/Contact';
import { useState } from 'react';
import { useTicketsStore } from '../../store/useTicketsStore';
import { useMainPage } from '../../store/useMainPage';

// 인라인 전용 컨테이너
function InlinePinkCard({ children, className = '' }) {
  return (
    <div
      className={`relative w-full h-full rounded-2xl bg-white text-black
         shadow-[0_10px_30px_rgba(0,0,0,0.12)]
         border border-pink-200 p-4 ${className}`}
    >
      {children}
    </div>
  );
}

// 공통 ui 컴포넌트 (모달/인라인 재사용 위해)
function AdminMypageBody({
  openAdminDashboard,
  setOpenAdminDashboard,
  setPageMode,
  onOpenReplyModal,
  onLogout,
}) {
  return (
    <div className="flex flex-col justify-start h-full gap-15">
      <div className="flex flex-col gap-10 w-full items-center border-b pb-10">
        <img
          className="mt-2 w-20 h-20 border rounded-[50%] border-gray-600 aspect-[1/1]"
          src="/images/nyangbiseo-sunglasses.png"
          alt="관리자 아바타"
        />
        <p className="text-[1.2rem]">관리자님 ㅎㅇ?</p>
      </div>

      <Button
        size="md"
        variant="common"
        onClick={() => {
          setOpenAdminDashboard(!openAdminDashboard);
          if (openAdminDashboard) setPageMode('main');
          else setPageMode('admin');
        }}
      >
        {openAdminDashboard ? <p>숨기기</p> : <p>유저 목록</p>}
      </Button>

      <Button size="md" variant="common" onClick={onOpenReplyModal}>
        답변함
      </Button>

      <button className="hover:underline mt-6 self-start" onClick={onLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default function AdminMypage({ embedded = false }) {
  const { openAdminPage, setOpenAdminPage } = useOpenAdminPage();
  const { openAdminDashboard, setOpenAdminDashboard } = useOpenAdminDashboard();

  const navigate = useNavigate();

  const [contactOpen, setContactOpen] = useState(false);
  const [contactTab, setContactTab] = useState('reply');
  const [expandedId, setExpandedId] = useState(null);
  const { tickets, setTickets } = useTicketsStore();
  const { setPageMode } = useMainPage();

  const openReplyModal = () => {
    setContactTab('reply');
    setContactOpen(true);
  };

  const doLogout = () => {
    setOpenAdminPage(false);
    navigate('/');
  };

  // 인라인 모드 여부에 따라 렌더링 분기
  if (embedded) {
    return (
      <>
        <InlinePinkCard>
          <AdminMypageBody
            openAdminDashboard={openAdminDashboard}
            setOpenAdminDashboard={setOpenAdminDashboard}
            setPageMode={setPageMode}
            onOpenReplyModal={openReplyModal}
            onLogout={doLogout}
          />
        </InlinePinkCard>

        {/* 문의 모달 (크기/스타일 변경 없음) */}
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
          isAdmin={true}
          adminOnlyReply={true}
        />
      </>
    );
  }

  return (
    <>
      <PinkCard open={openAdminPage} onClose={() => setOpenAdminPage(false)}>
        <button
          className="ml-auto text-black/80 hover:text-black text-xl"
          onClick={() => {
            setOpenAdminPage(false);
            setOpenAdminDashboard(false);
          }}
          aria-label="close"
        >
          ✕
        </button>

        <AdminMypageBody
          openAdminDashboard={openAdminDashboard}
          setOpenAdminDashboard={setOpenAdminDashboard}
          setPageMode={setPageMode}
          onOpenReplyModal={openReplyModal}
          onLogout={doLogout}
        />
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
