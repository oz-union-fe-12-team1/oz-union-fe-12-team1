import { useState } from 'react';
import { useTicketsStore } from '../../../store/useTicketsStore';
import { formatSeoul } from './dateUtil';

export default function useTicketActions() {
  // Zustand tickets
  const tickets = useTicketsStore((s) => s.tickets);
  const setTickets = useTicketsStore((s) => s.setTickets);

  // 편집/답변 draft/알림 상태
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [replyDrafts, setReplyDrafts] = useState({}); // { [id]: string }
  const [alert, setAlert] = useState({ open: false, title: '알림', message: '' });
  const showInfo = (message, title = '알림') => setAlert({ open: true, title, message });

  // 제출
  const submitAsk = ({ title, body }) => {
    const newTicket = {
      id: Date.now(),
      status: '처리중',
      title: String(title || '').trim(),
      body: String(body || '').trim(),
      time: formatSeoul(new Date()),
    };
    setTickets((prev) => [newTicket, ...prev]);
    showInfo('문의가 접수되었습니다.');
    return newTicket;
  };

  // 편집
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

  // 답변
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

  return {
    tickets,
    setTickets,
    submitAsk,
    startEdit,
    cancelEdit,
    saveEdit,
    submitReply,
    editingId,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
    replyDrafts,
    setReplyDrafts,
    alert,
    setAlert,
    showInfo,
  };
}
