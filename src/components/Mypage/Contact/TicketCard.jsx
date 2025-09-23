// src/components/Mypage/Contact/TicketCard.jsx
export default function TicketCard({
  t,
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
  const isOpen = expandedId === t.id;
  const isEditing = editingId === t.id;

  // 보기 영역에서 완료 문구(기존 답변 없으면 기본 문구)
  const resultText = t.answer ?? '완료된 문의입니다. 재답변 시 내용이 갱신됩니다.';

  // 답변함 textarea: 완료 상태일 때는 항상 빈값(플레이스홀더만 보여주기)
  const replyPlaceholder =
    t.status === '처리중'
      ? '사용자에게 보낼 답변을 입력하세요.'
      : '완료된 문의입니다. 재답변 시 내용이 갱신됩니다.';
  const replyValue = replyDrafts[t.id] ?? (t.status === '처리중' ? (t.answer ?? '') : '');

  return (
    <div className="border rounded p-3">
      {/* 헤더(펼치기 토글) */}
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => {
          if (editingId && editingId !== t.id) cancelEdit();
          if (isEditing && isOpen) return; // 편집 중일 때 닫힘 방지
          setExpandedId(isOpen ? null : t.id);
        }}
        className="w-full text-left cursor-pointer select-none"
      >
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-sm font-semibold">
            [{t.status}] {isEditing ? editTitle : t.title}
          </div>
          <div className="text-xs text-slate-500 shrink-0">{t.time}</div>
        </div>
        <div className="text-sm mt-1 line-clamp-2">{isEditing ? editBody : t.body}</div>
      </button>

      {/* 바디 */}
      <div
        className={[
          'mt-2 overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="pt-2 border-t text-sm">
          {isEditing ? (
            // 편집 모드
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
                  className="w-full min-h-[8rem] border rounded p-2 text-sm"
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
            // 보기 모드
            <>
              {t.status === '처리중' ? (
                <div className="text-slate-700">
                  <div className="font-medium">답변 대기중입니다.</div>
                  <div>
                    영업시간은 <b>09:00 ~ 18:00</b> 입니다. 조금만 기다려주세요.
                  </div>
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
                  <div className="text-slate-800 whitespace-pre-wrap">{resultText}</div>
                </div>
              )}

              {/* 관리자 답변 영역 (답변함 탭 전용) */}
              {isReplyTab && (
                <div className="mt-3 p-3 border rounded bg-slate-50">
                  <div className="text-xs text-slate-500 mb-2">관리자 답변</div>
                  <textarea
                    className="w-full min-h-[7rem] border rounded p-2 text-sm"
                    placeholder={replyPlaceholder}
                    value={replyValue}
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
}
