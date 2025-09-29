// src/Mypage/features/EditBirthdateField.jsx
import { useMemo } from 'react';
import Label from '../common/Label';

export default function EditBirthdateField({ value, onChangeValue, onApply, saving }) {
  const today = useMemo(() => {
    return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date());
  }, []);

  return (
    <div className="rounded-xl border border-white/10 p-4 space-y-2">
      <Label>생년월일</Label>
      <div className="flex gap-2">
        <input
          type="date"
          className="input date-icon-white"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
          min="1900-01-01"
          max={today}
        />
        <button className="btn" onClick={onApply} disabled={saving}>
          적용
        </button>
      </div>
    </div>
  );
}
