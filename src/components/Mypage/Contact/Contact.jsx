// src/components/Mypage/Contact/Contact.jsx
import ModalPortal from '../common/ModalPortal';
import { useMemo, useState } from 'react';
import AskForm from './AskForm';
import TicketToolbar from './TicketToolbar';
import TicketList from './TicketList';

// 날짜 포맷: "YYYY-MM-DD HH:MM" (서울 기준)
const fmt = new Intl.DateTimeFormat('sv-SE', {
  dateStyle: 'short',
  timeStyle: 'short',
  hour12: false,
  timeZone: 'Asia/Seoul',
});

export default function Contact({
  open,
  tab,
  setTab,
  onClose,
  tickets = [],
  setTickets,
  expandedId,
  setExpandedId,
  isAdmin = true,
}) {
  // 검색/필터 상태
  const [statusFilter, setStatusFilter] = useState('all'); // all | 처리중 | 완료
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const applySearch = () => setSearchQuery(searchInput.trim());

  // 사용자 편집 상태
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  // 관리자 답변 드래프트
  const [replyDrafts, setReplyDrafts] = useState({});

  // 티켓 필터링(제목/본문/답변에 검색어 포함)
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

  // 문의 제출
  const submitAsk = ({ title, body }) => {
    const now = new Date();
    const time = fmt.format(now);
    const newId = Date.now();
    setTickets((prev) => [
      { id: newId, status: '처리중', title: title.trim(), time, body: body.trim() },
      ...prev,
    ]);
    setTab('inbox');
    setExpandedId(newId);
    alert('문의가 접수되었습니다.');
  };

  // 사용자 편집(제목/내용)
  const startEdit = (t) => {
    setEditingId(t.id);
    setEditTitle(t.title);
    setEditBody(t.body);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };
  const saveEdit = (t) => {
    if (!editTitle.trim() || !editBody.trim()) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) =>
      prev.map((it) =>
        it.id === t.id ? { ...it, title: editTitle.trim(), body: editBody.trim() } : it,
      ),
    );
    setEditingId(null);
    alert('수정이 반영되었습니다.');
  };

  // 관리자 답변 등록
  const submitReply = (t) => {
    const draft = (replyDrafts[t.id] || '').trim();
    if (!draft) {
      alert('답변 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) =>
      prev.map((it) => (it.id === t.id ? { ...it, status: '완료', answer: draft } : it)),
    );
    setReplyDrafts((prev) => ({ ...prev, [t.id]: '' }));
    alert('답변이 등록되었습니다.');
  };

  // 탭 목록
  const tabs = [
    { key: 'ask', label: '문의하기' },
    { key: 'inbox', label: '문의함' },
    ...(isAdmin ? [{ key: 'reply', label: '답변함' }] : []),
  ];

  if (!open) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[999] bg-black/40">
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2">
          <div className="bg-white rounded-lg shadow-lg w-full h-[min(90vh,800px)] p-5 flex flex-col">
            {/* 헤더 */}
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
                    // 탭 이동 시 편집상태 초기화
                    cancelEdit();
                    setTab(t.key);
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* 컨텐츠 */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {tab === 'ask' ? (
                <AskForm onCancel={onClose} onSubmit={submitAsk} />
              ) : (
                <div className="flex flex-col">
                  <TicketToolbar
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    applySearch={applySearch}
                  />

                  <TicketList
                    items={filteredTickets}
                    isReplyTab={tab === 'reply' && isAdmin}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    // 사용자 편집
                    editingId={editingId}
                    editTitle={editTitle}
                    editBody={editBody}
                    startEdit={startEdit}
                    cancelEdit={cancelEdit}
                    setEditTitle={setEditTitle}
                    setEditBody={setEditBody}
                    saveEdit={saveEdit}
                    // 관리자 답변
                    replyDrafts={replyDrafts}
                    setReplyDrafts={setReplyDrafts}
                    submitReply={submitReply}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
