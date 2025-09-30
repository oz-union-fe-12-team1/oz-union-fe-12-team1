import { useRef, useState } from 'react';
import Modal from '../../ui/Modal';

export default function AskForm({ onCancel, onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const bodyRef = useRef(null);

  // 알림 모달
  const [alert, setAlert] = useState({ open: false, title: '알림', message: '' });
  const showInfo = (message, title = '알림') => setAlert({ open: true, title, message });

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      showInfo('제목과 내용을 입력해 주세요.');
      return;
    }
    onSubmit({ title: title.trim(), body: body.trim() });
    setTitle('');
    setBody('');
  };

  return (
    <form className="flex flex-col h-full" onSubmit={submit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-200">제목</label>
        <input
          className="input"
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              bodyRef.current?.focus();
            }
          }}
        />
      </div>

      <div className="space-y-2 mt-4 flex-1 flex flex-col">
        <label className="text-sm font-medium text-neutral-200">내용</label>
        <textarea
          ref={bodyRef}
          className="input flex-1"
          placeholder="문의 내용을 입력하세요."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') submit(e);
          }}
        />
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="btn">
          보내기
        </button>
      </div>

      <Modal
        openModal={open}
        title="알림"
        onClose={close}
        footer={
          <button type="button" className="btn" onClick={close}>
            확인
          </button>
        }
      >
        <p className="mt-2 text-sm text-neutral-200">{alert.message}</p>
      </Modal>
    </form>
  );
}
