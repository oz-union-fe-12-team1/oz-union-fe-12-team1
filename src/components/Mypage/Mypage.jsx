import { useEffect, useState } from 'react';
import { getMeMock, updateMeMock } from '../../mockData';
import { useOpenMyPage } from '../../store/useOpenMyPage';
import PinkCard from './common/PinkCard';
import Contact from './Contact/Contact';
import MypageEdit from './MypageEdit';
import Leave from './Leave';
import { useNavigate } from 'react-router-dom';
import { useTicketsStore } from '../../store/useTicketsStore';

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

function MainView({ onAsk, name, birthdate }) {
  // [REF]
  return (
    <div className="flex-1 space-y-4 text-center">
      <p className="text-lg font-semibold">{(name ?? '회원') + '님 어서오세요!'}</p>
      <p className="text-sm text-slate-700">생년월일: {birthdate ?? '—'}</p>
      <p className="text-sm text-slate-700">
        도움이 필요하신가요?
        <button className="ml-2 px-2 py-1 bg-slate-200 rounded text-sm" onClick={onAsk}>
          문의하기
        </button>
      </p>
    </div>
  );
}

function MypageBody({
  me,
  mode,
  setMode,
  previewImage,
  setPreviewImage,
  onOpenInboxModal,
  onOpenAskModal,
  onClose,
  onLogout,
  onSubmitUpdate,
  embedded = false,
}) {
  return (
    <>
      {/* 상단 바 */}
      <div className="flex items-center justify-between">
        {mode !== 'view' ? (
          <button
            className="text-black/80 hover:text-black text-xl"
            onClick={() => setMode('view')}
            aria-label="back"
          >
            ←
          </button>
        ) : (
          <div />
        )}

        {/* 닫기 */}
        {!embedded && (
          <button
            className="ml-auto text-black/80 hover:text-black text-xl"
            onClick={onClose}
            aria-label="close"
            title="닫기"
          >
            ✕
          </button>
        )}
      </div>

      {/* 프로필 */}
      <div className="flex flex-col items-center mt-2">
        <div className="w-20 h-20 rounded-full bg-black overflow-hidden">
          {(previewImage ?? me?.profile_image) && (
            <img
              src={previewImage ?? me?.profile_image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <span className="mt-2 text-sm text-slate-800">{me?.email ?? '-'}</span>
      </div>

      <hr className="my-4 border-black/20" />

      {/* 문의함 버튼: view 모드에서만 노출 (Contact는 항상 모달) */}
      {mode === 'view' && (
        <div className="flex justify-end -mt-2">
          <button
            className="text-xs px-2 py-1 rounded bg-white/60 hover:bg-white shadow-sm border"
            onClick={onOpenInboxModal}
          >
            문의함
          </button>
        </div>
      )}

      {/* 본문(모드별) */}
      <div className="flex-1">
        {mode === 'view' && (
          <MainView name={me?.username} birthdate={me?.birthdate} onAsk={onOpenAskModal} />
        )}

        {mode === 'edit' && (
          <MypageEdit
            defaultUsername={me?.username ?? ''}
            defaultBirthdate={me?.birthdate ?? ''}
            defaultProfileImage={me?.profile_image ?? ''}
            onSubmit={onSubmitUpdate}
            onAskDelete={() => setMode('leave')}
            onPreview={setPreviewImage}
          />
        )}

        {mode === 'leave' && <Leave onCancel={() => setMode('view')} />}
      </div>

      {/* 하단 메뉴 */}
      <div className="mt-6 flex justify-between text-sm font-medium">
        {mode !== 'edit' && (
          <button className="hover:underline" onClick={() => setMode('edit')}>
            편집
          </button>
        )}
        <button className="hover:underline" onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </>
  );
}

export default function Mypage({ embedded = false }) {
  const navigate = useNavigate();
  const { openMyPage, setOpenMyPage } = useOpenMyPage();
  const [me, setMe] = useState(null);

  // 우측 카드 내부 상태
  const [mode, setMode] = useState('view'); // 'view' | 'edit' | 'leave'
  const [askOpen, setAskOpen] = useState(false);
  const [askTab, setAskTab] = useState('ask'); // 'ask' | 'inbox'
  const [expandedId, setExpandedId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { tickets, setTickets } = useTicketsStore();

  useEffect(() => {
    (async () => {
      const data = await getMeMock();
      setMe(data);
    })();
  }, []);

  const handleUpdate = async (payload) => {
    const updated = await updateMeMock(payload);
    setMe(updated);
    setMode('view');
  };

  const openInboxModal = () => {
    setAskTab('inbox');
    setAskOpen(true);
  };

  const openAskModal = () => {
    setAskTab('ask');
    setAskOpen(true);
  };

  const doLogout = () => {
    setOpenMyPage(false);
    navigate('/');
  };

  if (embedded) {
    /* [NEW] 인라인 모드: 오른쪽 aside 안에서 고정 노출 */
    return (
      <>
        <InlinePinkCard>
          <MypageBody
            me={me}
            mode={mode}
            setMode={setMode}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            onOpenInboxModal={openInboxModal}
            onOpenAskModal={openAskModal}
            onClose={() => {}}
            onLogout={doLogout}
            onSubmitUpdate={handleUpdate}
            embedded={true}
          />
        </InlinePinkCard>

        {/* 문의/문의함 모달 (그대로) */}
        <Contact
          open={askOpen}
          tab={askTab}
          setTab={setAskTab}
          onClose={() => setAskOpen(false)}
          tickets={tickets}
          setTickets={setTickets}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          isAdmin={false}
        />
      </>
    );
  }

  return (
    <>
      <PinkCard open={openMyPage} onClose={() => setOpenMyPage(false)}>
        <MypageBody
          me={me}
          mode={mode}
          setMode={setMode}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
          onOpenInboxModal={openInboxModal}
          onOpenAskModal={openAskModal}
          onClose={() => setOpenMyPage(false)}
          embedded={false}
          onLogout={doLogout}
          onSubmitUpdate={handleUpdate}
        />
      </PinkCard>

      {/* 문의 모달 */}
      <Contact
        open={askOpen}
        tab={askTab}
        setTab={setAskTab}
        onClose={() => setAskOpen(false)}
        tickets={tickets}
        setTickets={setTickets}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        isAdmin={false}
      />
    </>
  );
}
