import { useEffect, useRef, useState } from 'react';

export default function PasswordChangeBox({ onDone }) {
  const topRef = useRef(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPw2, setNewPw2] = useState('');
  const [savingPw, setSavingPw] = useState(false);

  useEffect(() => {
    if (topRef.current && topRef.current.scrollIntoView) {
      topRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  function applyPassword() {
    if (newPw !== newPw2) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    if (!curPw || !newPw) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    setSavingPw(true);
    setTimeout(() => {
      setSavingPw(false);
      setCurPw('');
      setNewPw('');
      setNewPw2('');
      alert('비밀번호 변경(목업) 처리되었습니다.');
    }, 300);
  }

  const label = savingPw ? '적용 중…' : '적용';

  return (
    <div ref={topRef} className="space-y-6 text-white">
      <div className="rounded-xl border border-white/10 p-4 space-y-3">
        <div className="font-semibold text-white">비밀번호 변경</div>
        <div className="grid gap-2">
          <input
            className="input"
            type="password"
            placeholder="현재 비밀번호"
            value={curPw}
            onChange={(e) => setCurPw(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="새로운 비밀번호"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="input flex-1"
              type="password"
              placeholder="새로운 비밀번호 확인"
              value={newPw2}
              onChange={(e) => setNewPw2(e.target.value)}
            />
            <button className="btn" type="button" onClick={applyPassword} disabled={savingPw}>
              {label}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button className="btn-secondary" type="button" onClick={onDone}>
          완료
        </button>
      </div>
    </div>
  );
}
