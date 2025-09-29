import ModalPortal from '../common/ModalPortal';
import Modal from '../../ui/Modal';
import { useEffect, useMemo, useState } from 'react';
import AskForm from '../Contact/AskForm';
import TicketToolbar from '../Contact/TicketToolbar';
import TicketCard from '../Contact/TicketCard';

// YYYY-MM-DD HH:MM (Asia/Seoul)
const fmt = new Intl.DateTimeFormat('sv-SE', {
  dateStyle: 'short',
  timeStyle: 'short',
  hour12: false,
  timeZone: 'Asia/Seoul',
});

export default function Contact({
  open,
  isOpen,
  tab,
  setTab,
  onClose,
  tickets = [],
  setTickets,
  expandedId,
  setExpandedId,
  isAdmin = false,
  adminOnlyReply = false,
}) {
  // ── 알림 모달 상태
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('알림');
  const [infoMessage, setInfoMessage] = useState('');

  function showInfo(message, title) {
    const t = title || '알림';
    const m = message || '';
    setInfoTitle(t);
    setInfoMessage(m);
    setInfoOpen(true);
  }
  function closeInfo() {
    setInfoOpen(false);
  }

  // ── 검색/필터 상태
  const [statusFilter, setStatusFilter] = useState('all'); // all | 처리중 | 완료
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function applySearch() {
    const q = (searchInput || '').trim();
    setSearchQuery(q);
  }
  useEffect(() => {
    const empty = (searchInput || '').trim() === '';
    if (empty) setSearchQuery('');
  }, [searchInput]);

  // ── 편집/답변 상태
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [replyDrafts, setReplyDrafts] = useState({});

  // ── 필터링된 티켓
  const filteredTickets = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    const list = Array.isArray(tickets) ? tickets : [];
    const out = [];
    for (let i = 0; i < list.length; i += 1) {
      const t = list[i];
      let statusOk = false;
      if (statusFilter === 'all') statusOk = true;
      else if (t.status === statusFilter) statusOk = true;

      if (!statusOk) continue;
      if (!q) {
        out.push(t);
        continue;
      }
      const hay = `${t.title}\n${t.body}\n${t.answer || ''}`.toLowerCase();
      if (hay.indexOf(q) !== -1) out.push(t);
    }
    return out;
  }, [tickets, statusFilter, searchQuery]);

  // ── 탭 강제(관리자 전용)
  useEffect(() => {
    const opened = open || isOpen;
    if (!opened) return;
    if (!adminOnlyReply) return;
    if (!isAdmin) return;
    setTab('reply');
  }, [open, isOpen, adminOnlyReply, isAdmin, setTab]);

  // ── 문의함 첫 항목 자동 펼치기
  useEffect(() => {
    const opened = open || isOpen;
    if (!opened) return;
    if (tab !== 'inbox') return;
    if (filteredTickets.length === 0) return;

    let exists = false;
    for (let i = 0; i < filteredTickets.length; i += 1) {
      const t = filteredTickets[i];
      if (t.id === expandedId) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      setExpandedId(filteredTickets[0].id);
    }
  }, [open, isOpen, tab, filteredTickets, expandedId, setExpandedId]);

  // ── 액션: 문의 등록
  function submitAsk({ title, body }) {
    const t = (title || '').trim();
    const b = (body || '').trim();
    if (!t || !b) {
      showInfo('제목과 내용을 입력해 주세요.');
      return;
    }
    const now = new Date();
    const time = fmt.format(now);
    const newId = Date.now();

    setTickets((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      return [{ id: newId, status: '처리중', title: t, time, body: b }, ...base];
    });
    showInfo('문의가 접수되었습니다.');
    // 아래를 원하면 주석 해제
    // setTab('inbox');
    // setExpandedId(newId);
  }

  // ── 액션: 편집
  function startEdit(ticket) {
    setEditingId(ticket.id);
    setEditTitle(ticket.title);
    setEditBody(ticket.body);
  }
  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  }
  function saveEdit(ticket) {
    const t = (editTitle || '').trim();
    const b = (editBody || '').trim();
    if (!t || !b) {
      showInfo('제목과 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      const out = [];
      for (let i = 0; i < base.length; i += 1) {
        const it = base[i];
        if (it.id === ticket.id) out.push({ ...it, title: t, body: b });
        else out.push(it);
      }
      return out;
    });
    setEditingId(null);
    showInfo('수정이 반영되었습니다.');
  }

  // ── 액션: 답변
  function submitReply(ticket) {
    const raw = replyDrafts[ticket.id];
    const draft = (raw || '').trim();
    if (!draft) {
      showInfo('답변 내용을 입력해 주세요.');
      return;
    }
    setTickets((prev) => {
      const base = Array.isArray(prev) ? prev : [];
      const out = [];
      for (let i = 0; i < base.length; i += 1) {
        const it = base[i];
        if (it.id === ticket.id) out.push({ ...it, status: '완료', answer: draft });
        else out.push(it);
      }
      return out;
    });
    setReplyDrafts((prev) => ({ ...prev, [ticket.id]: '' }));
    showInfo('답변이 등록되었습니다.');
  }

  // ── 가드
  const opened = open || isOpen;
  if (!opened) return null;

  // ── 탭 목록
  function getTabs() {
    const arr = [];
    if (adminOnlyReply && isAdmin) {
      arr.push({ key: 'reply', label: '답변함' });
      return arr;
    }
    arr.push({ key: 'ask', label: '문의하기' });
    arr.push({ key: 'inbox', label: '문의함' });
    if (isAdmin) arr.push({ key: 'reply', label: '답변함' });
    return arr;
  }
  const tabs = getTabs();

  // ── 본문 렌더
  function renderBody() {
    if (tab === 'ask' && !adminOnlyReply) {
      return <ContactBodyAsk AskForm={AskForm} onClose={onClose} onSubmit={submitAsk} />;
    }
    if (tab === 'inbox') {
      return (
        <ContactBodyInbox
          TicketToolbar={TicketToolbar}
          filteredTickets={filteredTickets}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          applySearch={applySearch}
          TicketCard={TicketCard}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          editingId={editingId}
          editTitle={editTitle}
          editBody={editBody}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          saveEdit={saveEdit}
          replyDrafts={replyDrafts}
          setReplyDrafts={setReplyDrafts}
          submitReply={submitReply}
          isReplyTab={false}
        />
      );
    }
    if (tab === 'reply') {
      return (
        <ContactBodyReply
          TicketToolbar={TicketToolbar}
          filteredTickets={filteredTickets}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          applySearch={applySearch}
          TicketCard={TicketCard}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          editingId={editingId}
          editTitle={editTitle}
          editBody={editBody}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          saveEdit={saveEdit}
          replyDrafts={replyDrafts}
          setReplyDrafts={setReplyDrafts}
          submitReply={submitReply}
          isReplyTab={true}
        />
      );
    }
    return <div className="p-4 text-white">잘못된 탭입니다.</div>;
  }

  return (
    <ModalPortal>
      {/* 배경 */}
      <div className="fixed inset-0 z-[100] bg-black/50">
        <div className="flex justify-center items-center w-full h-full">
          <div className="bg-neutral-900 rounded-lg shadow-lg w-[80%] h-[90%] p-5 flex flex-col">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">문의하기</h3>
              <button className="text-xl text-neutral-300" onClick={onClose}>
                ✕
              </button>
            </div>

            {/* 탭 */}
            <ContactTabBar
              tabs={tabs}
              activeKey={tab}
              onChange={(key) => {
                cancelEdit();
                if (key === 'inbox') setExpandedId(null);
                setTab(key);
              }}
            />

            {/* 본문 */}
            <div className="flex-1 min-h-0 overflow-y-auto">{renderBody()}</div>
          </div>
        </div>
      </div>

      {/* 알림 모달 */}
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
