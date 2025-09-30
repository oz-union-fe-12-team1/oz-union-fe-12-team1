// src/Mypage/features/EditProfileImageField.jsx
import Label from '../common/Label';

export default function EditProfileImageField({
  value,
  onChangeValue,
  onPreview,
  onApply,
  saving,
}) {
  function handleFile(e) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const url = URL.createObjectURL(file);
    onPreview?.(url);
    onChangeValue(url);
  }

  return (
    <div className="rounded-xl border border-white/10 p-4 space-y-2">
      <Label>프로필 이미지</Label>

      <div className="flex items-center gap-2">
        <input
          className="input flex-1 min-w-0"
          value={value}
          placeholder="https://..."
          onChange={(e) => onChangeValue(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <input
          id="profile-file"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFile}
        />
        <label htmlFor="profile-file" className="btn cursor-pointer">
          파일선택
        </label>

        <button className="btn" onClick={onApply} disabled={saving}>
          적용
        </button>
      </div>
    </div>
  );
}
