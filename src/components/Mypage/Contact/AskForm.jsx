// src/components/Mypage/Contact/AskForm.jsx
import { useRef, useState } from 'react';

export default function AskForm({ onCancel, onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  const submit = (e) => {
    e.preventDefault(); // 새로고침 막기
    if (!title.trim() || !body.trim()) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }
    onSubmit({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <form className="flex flex-col h-full" onSubmit={submit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">제목</label>
        <input
          className="w-full border rounded p-2 text-sm"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // 제목에서 엔터 금지 + 본문으로 이동(선택)
              e.preventDefault();
              bodyRef.current?.focus();
            }
          }}
        />
      </div>

      <div className="space-y-2 mt-4 flex-1 flex flex-col">
        <label className="text-sm font-medium text-slate-700">내용</label>
        <textarea
          className="w-full flex-1 border rounded p-2 text-sm"
          placeholder="문의 내용을 입력하세요."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            // 본문에서 Ctrl/Cmd + Enter 로만 제출되게
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              submit(e);
            }
          }}
        />
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button className="btn-secondary" onClick={onCancel}>
          취소
        </button>
        <button className="btn" onClick={submit}>
          보내기
        </button>
      </div>
    </form>
  );
}
