// src/components/Mypage/Contact.jsx
import ModalPortal from './common/ModalPortal';
import { useState } from 'react';

export default function Contact({
  open,
  tab,            // 'ask' | 'inbox'
  setTab,
  onClose,
  tickets,
  setTickets,
  expandedId,
  setExpandedId,
}) {
  const [askTitle, setAskTitle] = useState('');
  const [askBody, setAskBody]   = useState('');

  if (!open) return null;

  const submit = () => {
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
    setTab('inbox');
    setExpandedId(newId);
    alert('문의가 접수되었습니다.');
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[999] bg-black/40">
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2">
          <div className="bg-white rounded-lg shadow-lg w-full h-[min(90vh,800px)] p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold">문의하기</h3>
              <button className="text-xl" onClick={onClose}>✕</button>
            </div>

            {/* 탭 */}
            <div className="mb-3 border-b flex gap-2">
              <button
                className={`px-3 py-2 text-sm ${tab==='ask' ? 'border-b-2 border-black font-semibold' : 'text-slate-500'}`}
                onClick={() => setTab('ask')}
              >문의하기</button>
              <button
                className={`px-3 py-2 text-sm ${tab==='inbox' ? 'border-b-2 border-black font-semibold' : 'text-slate-500'}`}
                onClick={() => setTab('inbox')}
              >문의함</button>
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
                      onChange={(e)=>setAskTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 mt-4 flex-1 flex flex-col">
                    <label className="text-sm font-medium text-slate-700">내용</label>
                    <textarea
                      className="w-full flex-1 border rounded p-2 text-sm"
                      placeholder="문의 내용을 입력하세요."
                      value={askBody}
                      onChange={(e)=>setAskBody(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 flex justify-end gap-2">
                    <button className="btn-secondary" onClick={onClose}>취소</button>
                    <button className="btn" onClick={submit}>보내기</button>
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
                          <div className={[
                            'mt-2 overflow-hidden transition-all duration-300',
                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                          ].join(' ')}>
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
      </div>
    </ModalPortal>
  );
}
