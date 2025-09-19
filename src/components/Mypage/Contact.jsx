// src/components/Mypage/Contact.jsx
import ModalPortal from './common/ModalPortal';
import { useState, useMemo } from 'react';

export default function Contact(props) {
  const {
    open,
    tab,
    setTab,
    onClose,
    tickets = [],
    setTickets,
    expandedId,
    setExpandedId,
    isAdmin = true,
  } = props;

  const [askTitle, setAskTitle] = useState('');
  const [askBody, setAskBody] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const [replyDrafts, setReplyDrafts] = useState({});

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const applySearch = () => setSearchQuery(searchInput.trim());

  const submit = () => {
    if (!askTitle.trim() || !askBody.trim()) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }
    const now = new Date();
    const time =
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ` +
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newId = Date.now();

    setTickets((prev) => [
      { id: newId, status: '처리중', title: askTitle.trim(), time, body: askBody.trim() },
      ...prev,
    ]);
    setAskTitle('');
    setAskBody('');
    setTab('inbox');
    setExpandedId(newId);
    alert('문의가 접수되었습니다.');
  };
  // 편집 시작: 현재 카드 내용을 편집 상태로 로드
  const startEdit = (t) => {
    setEditingId(t.id);
    setEditTitle(t.title);
    setEditBody(t.body);
  };

  // 편집 취소: 편집 상태/값 초기화
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };

  // 편집 저장: 제목/내용만 갱신하여 tickets 반영
  const saveEdit = (t) => {
    if (!editTitle.trim() || !editBody.trim()) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) =>
      prev.map((item) =>
        item.id === t.id ? { ...item, title: editTitle.trim(), body: editBody.trim() } : item,
      ),
    );
    setEditingId(null);
    alert('수정이 반영되었습니다.');
  };

  //  관리자 답변 등록
  const submitReply = (t) => {
    const draft = (replyDrafts[t.id] || '').trim();
    if (!draft) {
      alert('답변 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) =>
      prev.map((item) => (item.id === t.id ? { ...item, status: '완료', answer: draft } : item)),
    );
    setReplyDrafts((prev) => ({ ...prev, [t.id]: '' }));
    alert('답변이 등록되었습니다.');
  };

  //  목록 필터/검색 계산 (제목/내용/답변 텍스트 포함)
  const filteredTickets = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return tickets.filter((t) => {
      const statusOk = statusFilter === 'all' || t.status === statusFilter;
      if (!statusOk) return false;
      if (!q) return true;
      const hay = `${t.title}\n${t.body}\n${t.answer ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [tickets, statusFilter, searchQuery]);

  //  탭 버튼 목록 (관리자일 때만 답변함 추가)
  const tabs = [
    { key: 'ask', label: '문의하기' },
    { key: 'inbox', label: '문의함' },
    ...(isAdmin ? [{ key: 'reply', label: '답변함' }] : []),
  ];

  //  카드 렌더 함수 (문의함/답변함 공용)
  const renderTicketCard = (t, isReplyTab) => {
    const isOpen = expandedId === t.id;
    const isEditing = editingId === t.id;

    //  답변 드래프트 기본값은 기존 answer 또는 빈 문자열
    const replyDraft = replyDrafts[t.id] ?? t.answer ?? '';

    return (
      <div key={t.id} className="border rounded p-3">
        {/* 헤더: 클릭으로 토글 */}
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={() => {
            if (editingId && editingId !== t.id) {
              cancelEdit();
            }
            if (isEditing && isOpen) return; // 편집 중일 때 접힘 방지
            setExpandedId(isOpen ? null : t.id);
          }}
          className="w-full text-left cursor-pointer select-none"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div className="text-sm font-semibold">
              [{t.status}] {isEditing ? editTitle : t.title}{' '}
            </div>
            <div className="text-xs text-slate-500 shrink-0">
              <div className="text-xs text-slate-500">{t.time}</div>
            </div>
          </div>
          <div className="text-sm mt-1 line-clamp-2">{isEditing ? editBody : t.body}</div>
        </button>

        {/* 접이식 바디 */}
        <div
          className={[
            'mt-2 overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          ].join(' ')}
        >
          <div className="pt-2 border-t text-sm relative">
            {isEditing ? (
              //  사용자 편집 모드
              <div className="flex flex-col gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-600">제목</label>
                  <input
                    className="w-full border rounded p-2 text-sm"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="제목을 입력하세요."
                  />
                </div>
                <div className="space-y-1 flex-1 flex flex-col">
                  <label className="text-xs text-slate-600">내용</label>
                  <textarea
                    className="w-full min-h-32 border rounded p-2 text-sm"
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    placeholder="문의 내용을 입력하세요."
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button className="btn-secondary" onClick={cancelEdit}>
                    취소
                  </button>
                  <button className="btn" onClick={() => saveEdit(t)}>
                    완료
                  </button>
                </div>
              </div>
            ) : (
              //  보기 모드
              <>
                {t.status === '처리중' ? (
                  <div className="text-slate-700">
                    <div className="font-medium">답변 대기중입니다.</div>
                    <div>
                      영업시간은 <b>09:00 ~ 18:00</b> 입니다. 조금만 기다려주세요.
                    </div>
                    {/*  사용자 편집 버튼 (처리중에서만) */}
                    {!isReplyTab && (
                      <div className="mt-3 flex justify-end">
                        <button
                          className="text-xs text-slate-600 underline"
                          onClick={() => startEdit(t)}
                        >
                          수정
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-slate-500 text-xs">처리 결과</div>
                    <div className="text-slate-800 whitespace-pre-wrap">
                      {t.answer ?? '처리가 완료되었습니다.'}
                    </div>
                  </div>
                )}

                {/*  관리자 답변 영역 (답변함 탭에서만 노출) */}
                {isReplyTab && (
                  <div className="mt-3 p-3 border rounded bg-slate-50">
                    <div className="text-xs text-slate-500 mb-2">관리자 답변</div>
                    <textarea
                      className="w-full min-h-28 border rounded p-2 text-sm"
                      placeholder={
                        t.status === '처리중'
                          ? '사용자에게 보낼 답변을 입력하세요.'
                          : '완료된 문의입니다. 재답변 시 내용이 갱신됩니다.'
                      }
                      value={replyDraft}
                      onChange={(e) =>
                        setReplyDrafts((prev) => ({ ...prev, [t.id]: e.target.value }))
                      }
                    />
                    <div className="mt-2 flex justify-end gap-2">
                      <button
                        className="btn-secondary"
                        onClick={() => setReplyDrafts((prev) => ({ ...prev, [t.id]: '' }))}
                      >
                        취소
                      </button>
                      <button className="btn" onClick={() => submitReply(t)}>
                        확인
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return open ? (
    <ModalPortal>
      <div className="fixed inset-0 z-[999] bg-black/40">
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2">
          <div className="bg-white rounded-lg shadow-lg w-full h-[min(90vh,800px)] p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold">문의하기</h3>
              <button className="text-xl" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* 탭 */}
            <div className="mb-3 border-b flex gap-2">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  className={`px-3 py-2 text-sm ${tab === t.key ? 'border-b-2 border-black font-semibold' : 'text-slate-500'}`}
                  onClick={() => {
                    // 탭 이동 시 진행 중인 편집이 있다면 초기화
                    cancelEdit();
                    setTab(t.key);
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* 탭 컨텐츠 */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {tab === 'ask' ? (
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
                    <button className="btn-secondary" onClick={onClose}>
                      취소
                    </button>
                    <button className="btn" onClick={submit}>
                      보내기
                    </button>
                  </div>
                </div>
              ) : (
                //  문의함/답변함 공통: 필터/검색 + 목록
                <div className="flex flex-col">
                  {/*  필터/검색 툴바 (질문박스 위쪽) */}
                  <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2 -ml--1">
                      <select
                        className="border rounded px-2 py-1 text-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">전체</option>
                        <option value="처리중">처리중</option>
                        <option value="완료">완료</option>
                      </select>
                    </div>

                    {/*  검색창 + 넓은 버튼 */}
                    <div className="flex items-center gap-2 w-full md:w-[480px]">
                      <input
                        className="w-full border rounded px-3 py-2 text-sm"
                        placeholder="제목+내용 검색어를 입력하세요"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') applySearch();
                        }}
                      />
                      <button
                        type="button"
                        onClick={applySearch}
                        className="shrink-0 inline-flex items-center justify-center rounded bg-slate-900 text-white text-sm w-24 px-4 py-2 hover:bg-slate-800"
                      >
                        검색
                      </button>
                    </div>
                  </div>

                  {/* 목록 */}
                  <div className="space-y-2">
                    {filteredTickets.length === 0 ? (
                      <div className="text-sm text-slate-500">해당 조건의 문의가 없습니다.</div>
                    ) : (
                      filteredTickets.map((t) => renderTicketCard(t, tab === 'reply' && isAdmin))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  ) : null;
}
