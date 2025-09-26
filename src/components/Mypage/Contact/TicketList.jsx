// src/components/Mypage/Contact/TicketList.jsx
import TicketCard from './TicketCard';

export default function TicketList({
  items,
  isReplyTab,

  expandedId,
  setExpandedId,

  editingId,
  editTitle,
  editBody,
  startEdit,
  cancelEdit,
  setEditTitle,
  setEditBody,
  saveEdit,

  replyDrafts,
  setReplyDrafts,
  submitReply,
}) {
  if (items.length === 0) {
    return <div className="text-sm text-neutral-400">해당 조건의 문의가 없습니다.</div>;
  }

  return (
    <div className="space-y-2">
      {items.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          isReplyTab={isReplyTab}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          // 편집
          editingId={editingId}
          editTitle={editTitle}
          editBody={editBody}
          startEdit={startEdit}
          cancelEdit={cancelEdit}
          setEditTitle={setEditTitle}
          setEditBody={setEditBody}
          saveEdit={saveEdit}
          // 관리자
          replyDrafts={replyDrafts}
          setReplyDrafts={setReplyDrafts}
          submitReply={submitReply}
        />
      ))}
    </div>
  );
}
