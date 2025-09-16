import { useEffect, useState } from 'react';
import { useOpenMyPage } from '../store/useOpenMyPage';
import { createPortal } from 'react-dom';
import { getMeMock, updateMeMock } from '../mockData';

export default function MyPage() {
  const { openMyPage, setOpenMyPage } = useOpenMyPage();
  const [me, setMe] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getMeMock();
      setMe(data);
    })();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      {/* 헤더 */}
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6">
        <h1 className="text-lg font-medium">Logo</h1>
        <button
          className="w-10 h-10 rounded-full bg-blue-500 text-white"
          onClick={() => setOpenMyPage(true)}
        >
          mypage
        </button>
      </header>

      {/* 메인 */}
      <main className="flex-1 bg-slate-100 p-4">
        <div className="h-full grid grid-cols-[3fr_1fr] gap-4">
          {/* 왼쪽 */}
          <div className="grid grid-rows-[1fr_2fr] gap-4">
            <div className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <span className="text-lg font-medium text-slate-700">뉴스</span>
              </div>
              <div className="bg-white rounded-lg p-6 flex items-center justify-center">
                <span className="text-lg font-medium text-slate-700">날씨</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 flex items-center justify-center">
              <span className="text-xl font-medium text-slate-700">메인</span>
            </div>
          </div>

          {/* 오른쪽 (기준 컨테이너) */}
          <div className="relative">
            {/* 기본 파란 박스 */}
            <div
              className={`bg-blue-600 rounded-lg p-6 flex items-center justify-center h-full ${
                openMyPage ? 'invisible' : ''
              }`}
            >
              <span className="text-lg font-medium text-white">버튼</span>
            </div>

            {/* 분홍 카드: 오른쪽 박스만 덮는 오버레이 */}
            <PinkMyPageCard
              open={openMyPage}
              onClose={() => setOpenMyPage(false)}
              me={me}
              onUpdate={async (payload) => {
                const updated = await updateMeMock(payload);
                setMe(updated);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- 분홍 카드 컴포넌트 ---------- */
function PinkMyPageCard({ open, onClose, me, onUpdate }) {
  // view / edit / delete 3단계
  const [mode, setMode] = useState('view');
  const [askOpen, setAskOpen] = useState(false);
  const [askTab, setAskTab] = useState('ask');
  const [previewImage, setPreviewImage] = useState(null); //업로드 미리보기
  const [askTitle, setAskTitle] = useState('');
  const [askBody, setAskBody] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [tickets, setTickets] = useState([
    {
    id: 1,
    status: '처리중',
    title: '로그인 문제가 있어요',
    time: '2025-09-10 14:22',
    body: '비밀번호 변경이 안됩니다.',
    // answer 없음(처리중)
  },
  {
    id: 2,
    status: '완료',
    title: '생년월일 수정 요청',
    time: '2025-09-08 09:12',
    body: '형식 오류 경고가 나옵니다.',
    answer: '요청하신 생년월일 수정이 완료되었습니다. 다시 한 번 확인 부탁드립니다.',
  },
  ]);

  return (
    <div
      className={[
        'absolute inset-0 z-20 overflow-y-auto bg-pink-300 overscroll-contain',
        'transition-all duration-300',
        open
          ? 'opacity-100 translate-x-0'
          : 'pointer-events-none opacity-0 translate-x-2',
      ].join(' ')}
    >
      <div className="h-full p-6 flex flex-col min-h-0 rounded-lg shadow-xl ring-1 ring-black/10 bg-pink-300">
        <div className="flex items-center justify-between">
          {/* 뒤로가기 버튼: edit/delete 모드에서만 */}
          {mode !== 'view' && (
            <button
              className="text-black/80 hover:text-black text-xl"
              onClick={() => setMode('view')}
              aria-label="back"
            >
              ←
            </button>
          )}
          {/* 닫기 */}
          <button
            className="ml-auto text-black/80 hover:text-black text-xl"
            onClick={onClose}
            aria-label="close"
          >
            ✕
          </button>
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
          <span className="mt-2 text-sm text-slate-800">
            {me?.email ?? '-'}
          </span>
        </div>

        <hr className="my-4 border-black/20" />

        {/* 이메일 밑 선 오른쪽 위 문의함 버튼 */}
        <div className="flex justify-end -mt-2">
          <button
            className="text-xs px-2 py-1 rounded bg-white/60 hover:bg-white shadow-sm border"
            onClick={() => {
              setAskTab('inbox');
              setAskOpen(true);
            }}
          >
            문의함
          </button>
        </div>

        {/* 본문 (모드별 화면) */}
        <div className="flex-1">
          {mode === 'view' && (
            <ViewSection
              onAsk={() => {
                setAskTab('ask');
                setAskOpen(true);
              }}
              name={me?.username}
              birthdate={me?.birthdate}
            />
          )}

          {mode === 'edit' && (
            <EditSection
              defaultUsername={me?.username ?? ''}
              defaultBirthdate={me?.birthdate ?? ''}
              defaultProfileImage={me?.profile_image ?? ''}
              onSubmit={onUpdate}
              onAskDelete={() => setMode('delete')}
              onPreview={(url) => setPreviewImage(url)}
            />
          )}

          {mode === 'delete' && (
            <DeleteSection onCancel={() => setMode('view')} />
          )}
        </div>

        {/* 하단 메뉴 */}
        <div className="mt-6 flex justify-between text-sm font-medium">
          {mode !== 'edit' && (
            <button className="hover:underline" onClick={() => setMode('edit')}>
              편집
            </button>
          )}
          <button className="hover:underline">로그아웃</button>
        </div>

                {/* 문의하기 모달 (포털) */}
        {askOpen &&
          createPortal(
            <div className="fixed inset-0 z-50 bg-black/40">
              {/* 메인(p-4) 좌우 여백과 정렬 맞춤 */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2">
                <div className="bg-white rounded-lg shadow-lg w-full h-[min(90vh,800px)] p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold">문의하기</h3>
                    <button className="text-xl" onClick={() => setAskOpen(false)}>✕</button>
                  </div>

                  {/* 탭 */}
                  <div className="mb-3 border-b flex gap-2">
                    <button
                      className={`px-3 py-2 text-sm ${askTab === 'ask' ? 'border-b-2 border-black font-semibold' : 'text-slate-500'}`}
                      onClick={() => setAskTab('ask')}
                    >
                      문의하기
                    </button>
                    <button
                      className={`px-3 py-2 text-sm ${askTab === 'inbox' ? 'border-b-2 border-black font-semibold' : 'text-slate-500'}`}
                      onClick={() => setAskTab('inbox')}
                    >
                      문의함
                    </button>
                  </div>

                  {/* 탭 컨텐츠 */}
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    {askTab === 'ask' ? (
                      <div className="flex flex-col h-full">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">제목</label>
                          <input
                            type="text"
                            className="w-full border rounded p-2 text-sm"
                            placeholder="제목을 입력하세요."
                            value={askTitle}
                            onChange={(e) => setAskTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 mt-4 flex-1 flex flex-col">
                          <label className="text-sm font-medium text-slate-700">내용</label>
                          <textarea
                            className="w-full flex-1 border rounded p-2 text-sm"
                            placeholder="문의 내용을 입력하세요."
                            value={askBody}
                            onChange={(e) => setAskBody(e.target.value)}
                          />
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                          <button className="btn-secondary" onClick={() => setAskOpen(false)}>취소</button>
                          <button
                            className="btn"
                            onClick={() => {
                              if (!askTitle.trim() || !askBody.trim()) {
                                alert('제목과 내용을 입력해 주세요.');
                                return;
                              }
                              const now = new Date();
                              const time =
                                `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ` +
                                `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
                              const newId = Date.now();
                              setTickets(prev => [
                                { id: newId, status: '처리중', title: askTitle.trim(), time, body: askBody.trim() },
                                ...prev,
                              ]);
                              setAskTitle('');
                              setAskBody('');
                              setAskTab('inbox');
                              alert('문의가 접수되었습니다.');
                              setExpandedId(newId);
                            }}
                          >
                            보내기
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {tickets.length === 0 ? (
                          <div className="text-sm text-slate-500">문의 내역이 없습니다.</div>
                        ) : (
                          tickets.map((t) => {
                            const isOpen = expandedId === t.id;
                            return (
                              <div key={t.id} className="border rounded p-3">
                                {/* 헤더: 클릭으로 토글 */}
                                <button
                                  type="button"
                                  aria-expanded={isOpen}
                                  onClick={() => setExpandedId(isOpen ? null : t.id)}
                                  className="w-full text-left cursor-pointer select-none"
                                >
                                  <div className="flex items-baseline justify-between gap-3">
                                    <div className="text-sm font-semibold">[{t.status}] {t.title}</div>
                                    <div className="text-xs text-slate-500 shrink-0">{t.time}</div>
                                  </div>
                                  <div className="text-sm mt-1 line-clamp-2">{t.body}</div>
                                </button>

                                {/* 접이식 바디 */}
                                <div className={['mt-2 overflow-hidden transition-all duration-300', isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'].join(' ')}>
                                  <div className="pt-2 border-t text-sm">
                                    {t.status === '처리중' ? (
                                      <div className="text-slate-700">
                                        <div className="font-medium">답변 대기중입니다.</div>
                                        <div>영업시간은 <b>09:00 ~ 18:00</b> 입니다. 조금만 기다려주세요.</div>
                                      </div>
                                    ) : (
                                      <div className="space-y-1">
                                        <div className="text-slate-500 text-xs">처리 결과</div>
                                        <div className="text-slate-800">{t.answer ?? '처리가 완료되었습니다.'}</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        }
      </div>
    </div>
  );
}


/* ---------- 섹션들 ---------- */
function ViewSection({ onAsk, name, birthdate }) {
  return (
    <div className="flex-1 space-y-4 text-center">
      <p className="text-lg font-semibold">
        {(name ?? '회원') + '님 어서오세요!'}
      </p>
      <p className="text-sm text-slate-700">생년월일: {birthdate ?? '—'}</p>
      <p className="text-sm text-slate-700">
        도움이 필요하신가요?
        <button
          className="ml-2 px-2 py-1 bg-slate-200 rounded text-sm"
          onClick={onAsk}
        >
          문의하기
        </button>
      </p>
    </div>
  );
}

function EditSection({
  defaultUsername,
  defaultBirthdate,
  defaultProfileImage,
  onSubmit,
  onAskDelete,
  onPreview,
}) {
  const [username] = useState(defaultUsername);
  const [birthdate, setBirthdate] = useState(defaultBirthdate); // YYYY-MM-DD
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [profileFileName, setProfileFileName] = useState('');

  // object URL 정리
  useEffect(() => {
    return () => {
      if (profileImage?.startsWith?.('blob:')) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  return (
    <div className="space-y-4">
      <Label>이미지 변경</Label>
      {/* 파일명 → 파일선택 버튼 순서로 표시 */}
      <div className="flex items-center gap-2">
        {profileFileName && (
          <span className="text-sm text-slate-700 max-w-[60%] truncate">
            {profileFileName}
          </span>
        )}
        {/* 실제 input은 숨기고 label을 버튼처럼 사용 */}
        <input
          id="profile-file"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setProfileFileName(file.name);
            const url = URL.createObjectURL(file);
            setProfileImage(url); // 로컬 미리보기
            onPreview?.(url); // 카드 상단 아바타 즉시 미리보기 반영
          }}
        />
        <label htmlFor="profile-file" className="btn cursor-pointer">
          파일선택
        </label>
      </div>

      <Label>생년월일 변경</Label>
      <div className="flex gap-2">
        <input
          className="input flex-1"
          placeholder="YYYY-MM-DD"
          type="text"
          inputMode="numeric"
          pattern="\d{4}-\d{2}-\d{2}"
          value={birthdate}
          onChange={(e) => setBirthdate(
            e.target.value
                .replace(/[^\d-]/g, '')          // 숫자/하이픈만
                .replace(/^(\d{4})(\d)/, '$1-$2') // 4자리 후 자동 하이픈
                .replace(/^(\d{4}-\d{2})(\d)/, '$1-$2') // 2자리 후 자동 하이픈
                .slice(0, 10))}
        />

        <button
          className="btn"
          onClick={async () => {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(birthdate)) {
              alert('생년월일은 YYYY-MM-DD 형식이어야 합니다.');
              return;
            }
            await onSubmit({
              username,
              profile_image: profileImage,
              birthdate,
            });
            alert('적용되었습니다.');
          }}
        >
          적용
        </button>
      </div>

      <Label>비밀번호 변경</Label>
      <div className="space-y-2">
        <input className="input" placeholder="현재 비밀번호" type="password" />
        <input
          className="input"
          placeholder="새로운 비밀번호"
          type="password"
        />
        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="새로운 비밀번호 확인"
            type="password"
          />
          <button
            className="btn"
            onClick={() => {
              // 실제 API 없으므로 데모 알림
              alert('적용되었습니다.');
            }}
          >
            적용
          </button>
        </div>
      </div>

      <button
        className="text-xs text-slate-700 underline"
        onClick={onAskDelete}
      >
        회원탈퇴
      </button>
    </div>
  );
}

function DeleteSection({ onCancel }) {
  return (
    <div className="space-y-3">
      <Label>회원탈퇴</Label>
      <div className="bg-green-100 rounded-xl p-3 text-sm text-slate-700">
        보내기는 싫지만… 가신다면 어쩔 수 없죠… 정말 떠나실건가요?
      </div>
      <div className="flex gap-2 justify-end">
        <button className="btn-secondary" onClick={onCancel}>
          취소
        </button>
        <button
          className="btn"
          onClick={() => {
            window.location.href = 'http://localhost:5173/';
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="text-sm font-semibold text-slate-800 mt-2">{children}</div>
  );
}
