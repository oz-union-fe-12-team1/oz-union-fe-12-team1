// src/Mypage/features/EditNicknameField.jsx
import Label from '../common/Label';

export default function EditNicknameField({ inputRef, value, onChangeValue, onApply, saving }) {
  return (
    <div className="rounded-xl border border-white/10 p-4 space-y-2">
      <Label>닉네임</Label>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          className="input flex-1 min-w-0"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
        <button className="btn" onClick={onApply} disabled={saving}>
          적용
        </button>
      </div>
    </div>
  );
}
