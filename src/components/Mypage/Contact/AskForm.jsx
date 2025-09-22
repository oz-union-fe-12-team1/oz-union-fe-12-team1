// src/components/Mypage/Contact/AskForm.jsx
import { useState } from 'react';

export default function AskForm({ onCancel, onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const submit = () => {
    if (!title.trim() || !body.trim()) {
      alert('제목과 내용을 입력해 주세요.');
      return;
    }
    onSubmit({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">제목</label>
        <input
          className="w-full border rounded p-2 text-sm"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2 mt-4 flex-1 flex flex-col">
        <label className="text-sm font-medium text-slate-700">내용</label>
        <textarea
          className="w-full flex-1 border rounded p-2 text-sm"
          placeholder="문의 내용을 입력하세요."
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
    </div>
  );
}
