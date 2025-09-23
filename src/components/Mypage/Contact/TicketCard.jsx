// src/components/Mypage/Contact/TicketCard.jsx
export default function TicketCard({
  ticket,
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

  replyDrafts = {},
  setReplyDrafts,
  submitReply,
}) {
  const isOpen = expandedId === ticket.id;
  const isEditing = editingId === ticket.id;
  const isPending = ticket?.status === '처리중';

  // 보기 영역에서 완료 문구(기존 답변 없으면 기본 문구)
  const resultText = ticket.answer ?? '완료된 문의입니다.';

  // 답변함 textarea: 완료 상태일 때는 항상 빈값(플레이스홀더만 보여주기)
  const replyPlaceholder = '사용자에게 보낼 답변을 입력하세요.'; // 완료건은 입력창 자체를 렌더하지 않음
  const hasDraft = Object.prototype.hasOwnProperty.call(replyDrafts, ticket.id);
  const replyValue = hasDraft ? replyDrafts[ticket.id] : isPending ? (ticket.answer ?? '') : '';

  return (
    <div className="border rounded p-3">
      {/* 헤더(펼치기 토글) */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`ticket-panel-${ticket.id}`}
        onClick={() => {
          if (editingId && editingId !== ticket.id) cancelEdit();
          if (isEditing && isOpen) return; // 편집 중일 때 닫힘 방지
          setExpandedId(isOpen ? null : ticket.id);
        }}
        className="w-full text-left cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
      >
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-sm font-semibold">
            [{ticket.status}] {isEditing ? editTitle : ticket.title}
          </div>
          <div className="text-xs text-slate-500 shrink-0">{ticket.time}</div>
        </div>
        <div className="text-sm mt-1 line-clamp-2">{isEditing ? editBody : ticket.body}</div>
      </button>

      {/* 바디 */}
      <div
        id={`ticket-panel-${ticket.id}`}
        className={[
          'mt-2 overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="pt-2 border-t text-sm">
          {isEditing ? (
            // 편집 모드
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
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
                  className="w-full min-h-[8rem] border rounded p-2 text-sm"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  placeholder="문의 내용을 입력하세요."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="btn-secondary" onClick={cancelEdit}>
                  취소
                </button>
                <button type="button" className="btn" onClick={() => saveEdit(ticket)}>
                  완료
                </button>
              </div>
            </form>
          ) : (
            // 보기 모드
            <>
              {ticket.status === '처리중' ? (
                <div className="text-slate-700">
                  <div className="font-medium">답변 대기중입니다.</div>
                  <div>
                    영업시간은 <b>09:00 ~ 18:00</b> 입니다. 조금만 기다려주세요.
                  </div>
                  {!isReplyTab && (
                    <div className="mt-3 flex justify-end">
                      <button
                        className="text-xs text-slate-600 underline"
                        onClick={() => {
                          if (!isOpen) setExpandedId(ticket.id);
                          startEdit(ticket);
                        }}
                      >
                        수정
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-slate-500 text-xs">처리 결과</div>
                  <div className="text-slate-800 whitespace-pre-wrap">{resultText}</div>
                </div>
              )}

              {/* 관리자 답변 영역 (답변함 탭 전용) */}
              {isReplyTab && isPending && (
                <div className="mt-3 p-3 border rounded bg-slate-50">
                  <div className="text-xs text-slate-500 mb-2">관리자 답변</div>
                  <textarea
                    className="w-full min-h-[7rem] border rounded p-2 text-sm"
                    placeholder={replyPlaceholder}
                    value={replyValue}
                    onChange={(e) =>
                      setReplyDrafts((prev) => ({ ...prev, [ticket.id]: e.target.value ?? '' }))
                    }
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        const trimmed = (replyDrafts[ticket.id] ?? '').trim();
                        if (trimmed) submitReply(ticket);
                      }
                    }}
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setReplyDrafts((prev) => ({ ...prev, [ticket.id]: '' }))}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="btn"
                      disabled={!(replyDrafts[ticket.id] ?? '').trim()}
                      onClick={() => submitReply(ticket)}
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}
              {isReplyTab && !isPending && (
                <div className="mt-3 p-3 border rounded bg-slate-50 text-slate-600 text-sm">
                  이 티켓은 이미 완료되었습니다.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
