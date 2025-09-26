// src/components/Mypage/Contact/Contact.jsx
import ModalPortal from '../common/ModalPortal';
import Modal from '../../ui/Modal';
import { useEffect, useMemo, useState } from 'react';
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
  isAdmin = false, //api 명세서 is_superuser로 교체 예정
  adminOnlyReply = false,
}) {
  // 알림 모달
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('알림');
  const [infoMessage, setInfoMessage] = useState('');
  const showInfo = (message, title = '알림') => {
    setInfoMessage(message);
    setInfoTitle(title);
    setInfoOpen(true);
  };
  const closeInfo = () => setInfoOpen(false);

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
    return tickets.filter((ticket) => {
      const statusOk = statusFilter === 'all' || ticket.status === statusFilter;
      if (!statusOk) return false;
      if (!q) return true;
      const hay = `${ticket.title}\n${ticket.body}\n${ticket.answer ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [tickets, statusFilter, searchQuery]);

  // 입력창이 비면 자동으로 전체 보기
  useEffect(() => {
    if (searchInput.trim() === '') setSearchQuery('');
  }, [searchInput]);

  // 문의함 탭일 때 첫 번째 항목 자동 펼치기
  useEffect(() => {
    if (!open) return;
    if (tab !== 'inbox') return;
    if (filteredTickets.length === 0) return;

    const exists = filteredTickets.some((ticket) => ticket.id === expandedId);
    if (!exists) {
      setExpandedId(filteredTickets[0].id);
    }
  }, [open, tab, filteredTickets, expandedId, setExpandedId]);

  // 문의 제출
  const submitAsk = ({ title, body }) => {
    const now = new Date();
    const time = fmt.format(now);
    const newId = Date.now();
    setTickets((prev) => [
      { id: newId, status: '처리중', title: title.trim(), time, body: body.trim() },
      ...prev,
    ]);
    // setTab('inbox');
    // setExpandedId(newId);
    showInfo('문의가 접수되었습니다.');
  };

  // 사용자 편집(제목/내용)
  const startEdit = (ticket) => {
    setEditingId(ticket.id);
    setEditTitle(ticket.title);
    setEditBody(ticket.body);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };
  const saveEdit = (ticket) => {
    if (!editTitle.trim() || !editBody.trim()) {
      showInfo('제목과 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) =>
      prev.map((it) =>
        it.id === ticket.id ? { ...it, title: editTitle.trim(), body: editBody.trim() } : it,
      ),
    );
    setEditingId(null);
    showInfo('수정이 반영되었습니다.');
  };

  // 관리자 답변 등록
  const submitReply = (ticket) => {
    const draft = (replyDrafts[ticket.id] || '').trim();
    if (!draft) {
      showInfo('답변 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) =>
      prev.map((it) => (it.id === ticket.id ? { ...it, status: '완료', answer: draft } : it)),
    );
    setReplyDrafts((prev) => ({ ...prev, [ticket.id]: '' }));
    showInfo('답변이 등록되었습니다.');
  };

  // 탭 목록
  const tabs = adminOnlyReply
    ? [{ key: 'reply', label: '답변함' }]
    : [
        { key: 'ask', label: '문의하기' },
        { key: 'inbox', label: '문의함' },
        ...(isAdmin ? [{ key: 'reply', label: '답변함' }] : []),
      ];

  // 관리자 전용 모드일 땐 탭을 강제로 'reply'로 유지
  useEffect(() => {
    if (!open) return;
    if (!adminOnlyReply) return;
    if (!isAdmin) return;

    setTab('reply');
  }, [open, adminOnlyReply, isAdmin, tab, setTab]);

  if (!open) return null;

  return (
    <ModalPortal>
      <div className={`fixed inset-0 z-40 bg-black/40`}>
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2">
          <div className="bg-neutral-900 rounded-lg shadow-lg w-full h-[min(90vh,800px)] p-5 flex flex-col">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">문의하기</h3>
              <button className="text-xl text-neutral-300" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* 탭 */}
            <div className="mb-3 border-b border-white/20 flex gap-2">
              {tabs.map((tabItem) => (
                <button
                  key={tabItem.key}
                  className={`px-3 py-2 text-sm transition-colors ${tab === tabItem.key ? 'border-b-2 border-white text-white font-semibold' : 'text-white/60 '}`}
                  onClick={() => {
                    // 탭 이동 시 편집상태 초기화
                    cancelEdit();
                    if (tabItem.key === 'inbox') setExpandedId(null);
                    setExpandedId(null);
                    setTab(tabItem.key);
                  }}
                >
                  {tabItem.label}
                </button>
              ))}
            </div>

            {/* 컨텐츠 */}
            <div className="flex-1 min-h-0 overflow-y-auto">
              {(() => {
                const isAskMode = tab === 'ask' && !adminOnlyReply;
                if (isAskMode) {
                  return <AskForm onCancel={onClose} onSubmit={submitAsk} />;
                }
                return (
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
                );
              })()}
            </div>
          </div>
        </div>
      </div>
      {/*공통 Modal로 알림 표시 */}
      <Modal
        openModal={infoOpen}
        title={infoTitle}
        onClose={closeInfo}
        footer={
          <button type="button" className="btn" onClick={closeInfo}>
            확인
          </button>
        }
      >
        <p className="mt-2 text-sm text-white">{infoMessage}</p>
      </Modal>
    </ModalPortal>
  );
}
